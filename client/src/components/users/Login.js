import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../complements/Navbar";
import Footer from "../complements/Footer";

function Login() {
  let history = useHistory();

  const [loginUsuario, setLoginUsuario] = useState("");
  const [loginContrasena, setLoginContrasena] = useState("");

  const login = async () => {
    let response = await axios({
      method: "POST",
      data: {
        username: loginUsuario,
        password: loginContrasena,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/usuarios/login`,
    });
    if (response.status === 200) {
      history.push("/");
    } else {
      history.go(0);
    }
  };

  return (
    <div className="">
      <Navbar login="true" />
      <div className="container text-center">
        <div className="card p-5 m-5 mx-auto" style={{ width: "40%" }}>
          <h1 className="display-5 fw-bold col-md-12">Iniciar Sesion</h1>
          <div className="container-fluid mb-3">
            <label htmlFor="usuario" className="form-label">
              Usuario:
            </label>
            <input
              type="text"
              name="usuario"
              id="usuario"
              className="form-control"
              onChange={(e) => {
                const { value } = e.target;
                setLoginUsuario(value);
              }}
            />
          </div>
          <div className="container-fluid mb-3">
            <label htmlFor="contrasena" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              name="contrasena"
              id="contrasena"
              className="form-control"
              onChange={(e) => {
                const { value } = e.target;
                setLoginContrasena(value);
              }}
            />
          </div>
          <div className="container-fluid">
            <button
              className="btn btn-warning mx-auto col-md-6"
              onClick={login}
            >
              Login
            </button>
          </div>
          <div className="container-fluid mt-3">
            <span className="col-md-12">
              ¿Aun no te has registrado?&nbsp;
              <a className="link-warning" href="/usuarios/crear">
                ¡Haz Click Aqui!
              </a>
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
