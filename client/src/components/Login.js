import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    let response = await axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/usuarios/login",
    });
    if (response.status === 200) {
      history.push("/");
    } else {
      history.go(0);
    }
  };

  return (
    <div className="formaUsuario">
      <div>
        <h1>Login</h1>
        <div>
          <div>
            <label htmlFor="username2">Username:</label>
            <input
              type="text"
              name="username2"
              id="username2"
              onChange={(e) => {
                const { value } = e.target;
                setLoginUsername(value);
              }}
            />
            <label htmlFor="password2">Password:</label>
            <input
              type="password"
              name="password2"
              id="password2"
              onChange={(e) => {
                const { value } = e.target;
                setLoginPassword(value);
              }}
            />
          </div>
          <button onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
