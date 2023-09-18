import React, { useState, useContext } from "react";
import "../styles/login.css";

import { Container, Row, Col, Button, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";

import { AuthContext } from "./../context/AuthContext";
import { BASE_URL } from "./../utilis/config";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const [userInput, setuserInput] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setuserInput((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const googleSubmit = async (googleUser) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch(`${BASE_URL}/auth/googleauth`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(googleUser),
      });
      const result = await res.json();
      
      if (!res.ok) alert(result.message);
      else {
        dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
        alert(result.message);
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userInput),
      });
      const result = await res.json();
      if (!res.ok) alert(result.message);
      else {
        dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
        alert(result.message);
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex justify-content-between">
              <div className="login_img">
                <img src={loginImg} alt="" />
              </div>

              <div className="login_form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Login</h2>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Email"
                      id="email"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="password"
                      placeholder="Password"
                      id="password"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <Button className="btn primary__btn auth_btn" type="submit">
                    Login
                  </Button>
                  <Button className="btn w-100  primary__btn  mt-2 mx-3 ">
                    <GoogleOAuthProvider clientId="284330869082-1gijk85i5no1vc8kl6rsbl50q0parmb4.apps.googleusercontent.com">
                      <GoogleLogin
                        onSuccess={googleSubmit}
                        theme="filled_blue"
                        shape="circle"
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </GoogleOAuthProvider>
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
