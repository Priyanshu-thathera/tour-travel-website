import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";

import { BASE_URL } from "./utilis/config";
import { useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import  Cookies  from 'js-cookie';

function App() {
  // get the cookie using js-cookie 
  const accessToken = Cookies.get('accessToken');

  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
  //  "Running useEffect to loginWithCookies"

    if (accessToken) {
      fetch(`${BASE_URL}/auth/loginwithToken`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ accessToken }),
      })
        .then((response) => response.json())

        .then((result) => {
          if (result.success) {
            dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
          }
        })
        .catch((error) => {
          console.error("Error logging in with cookies:", error);
        });
    }
  }, []);

  return <Layout />;
}

export default App;
