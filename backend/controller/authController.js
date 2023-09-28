import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";


export const register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // Find user by email
    if (user) {
      res.status(409).json({
        success: false,
        message: "Email Id is already Registerd",
      });
    } else {
      // authentication
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
      });

      await newUser.save();

      res.status(200).json({
        success: true,
        message: "Successfully Registerd",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to Register" });
  }
};

////////////////////////////// user login  //////////////////////////////
export const login = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    //  if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account doesn't exist" });
    } else {
      const CheckPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      // if password is wrong
      if (!CheckPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Wrong Password" });
      }
      const { password, role, ...rest } = user._doc;
      //   creating the token
      const loginToken = jwt.sign(
        { email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "15d" }
      );
      // set token in the browser cookie and send the response to the client
      res
        .cookie("accessToken", loginToken, {
          httpOnly: true,
          maxAge: 3600000 * 5, // This sets the cookie to expire in 5 hours
          secure: true, // Requires HTTPS to send the cookie
          sameSite: 'none', // Allow cross-origin requests
        })
        .status(200)
        .json({
          success: true,
          loginToken,
          role,
          message: "Successfully login",
          data: { ...rest },
        });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

/////////////////// logout /////////////

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true }); // Clear the accessToken cookie
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: "Failed to Logout" });
  }
};


////////////////////////////// user loginwith token //////////////////////////////

export const loginwithToken = async (req, res) => {
  const email = req.user.email;
  try {
    const user = await User.findOne({ email });

    //  if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Account doesn't exist" });
    } else {
      
      const { password, role, ...rest } = user._doc;
      res
        .status(200)
        .json({
          success: true,
          message: "Successfully login",
          data: { ...rest },
        });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

///////////////////// Google Login /////////////////
export const googleLogin = async (req, res) => {
  const cred = req.body;  
const client = new OAuth2Client(cred.clientId);
  try {
    const ticket = await client.verifyIdToken({
      idToken: cred.credential,
      audience: cred.clientId, // Google API Client ID
    });
    const payload = ticket.getPayload();
    const data ={
      username : payload.name,     
      email : payload.email
    }
    res.status(200).json({
      success: true,
      message: "Successfully login",
      data: {data },
    });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};
