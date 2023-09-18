import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  // console.log(token)
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "You are not authorized" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json({ success: false, message: "Token is invalid" });
      }
      // If the token is valid, you can attach the decoded user information to the request object
      req.user = user; // This line allows downstream route handlers to access the user information stored in cookie
      // console.log(user)
      next(); // Call the next middleware or route handler in the chain
    });
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.email === req.params.email || req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You are not authenticated" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }
  });
};
