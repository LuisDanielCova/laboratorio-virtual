import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "../complements/Navbar";
import Footer from "../complements/Footer";

function Login() {
  let history = useHistory();
  const [loginUsuario, setLoginUsuario] = useState("");
  const [loginContrasena, setLoginContrasena] = useState("");
  const [errors, setErrors] = useState("");
  const [cargando, setCargando] = useState(false);
  const [circuloCarga, setCirculoCarga] = useState("");
  const [inputType, setInputType] = useState(true);
  const [eyeIcon, setEyeIcon] = useState(true);

  const cambiarInput = () => {
    if (inputType) {
      setInputType(false);
      setEyeIcon(false);
    } else {
      setInputType(true);
      setEyeIcon(true);
    }
  };

  const login = async () => {
    setCargando(true);
    setErrors("");
    const response = await axios({
      method: "POST",
      data: {
        usuario: loginUsuario,
        contrasena: loginContrasena,
      },
      withCredentials: true,
      url: `${process.env.REACT_APP_SERVER_URL}/usuarios/login`,
    });
    setCargando(false);
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data);
      history.push("/inicio");
    } else {
      setErrors(
        <div className="alert alert-warning">{response.data.error}</div>
      );
    }
  };

  useEffect(() => {
    if (cargando === true) {
      setCirculoCarga(
        <div className="d-flex row justify-content-center my-3">
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <strong className="text-center text-warning">Cargando...</strong>
        </div>
      );
    } else {
      setCirculoCarga("");
    }
  }, [cargando]);

  return (
    <div className="">
      <Navbar login="true" />
      <div className="container text-center">
        <div className="card p-5 m-5 mx-auto w-50">
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
            <div className="input-group">
              <input
                type={inputType ? "password" : "text"}
                name="contrasena"
                id="contrasena"
                className="form-control"
                onChange={(e) => {
                  const { value } = e.target;
                  setLoginContrasena(value);
                }}
              />
              <button
                className="btn btn-warning"
                id="contrasenaBoton"
                onClick={cambiarInput}
              >
                <i className={eyeIcon ? "bi bi-eye" : "bi bi-eye-slash"}></i>
              </button>
            </div>
          </div>
          {circuloCarga}
          {errors}
          <div className="container-fluid">
            <button
              className="btn btn-warning mx-auto col-md-6"
              disabled={cargando ? true : false}
              onClick={login}
            >
              Login
            </button>
          </div>
          <div className="container-fluid mt-3">
            <span className="col-md-12">
              ¿Aun no te has registrado?&nbsp;
              <a className="link-warning" href="/registro">
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
