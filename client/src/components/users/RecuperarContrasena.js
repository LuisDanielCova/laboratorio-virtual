import React, { useState } from "react";
import axios from "axios";
import Navbar from "../complements/Navbar";
import Footer from "../complements/Footer";

function RecuperarContrasena() {
  const [usuario, setUsuario] = useState("");
  const [alert, setAlert] = useState("");

  const solicitarTokenRecuperacion = async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/usuarios/auth/pedir_contrasena`,
      { usuario: usuario }
    );
    if (response.status === 200) {
      setAlert(
        <div className="alert alert-warning">{response.data.mensaje}</div>
      );
    } else if (response.status === 206) {
      setAlert(
        <div className="alert alert-danger">{response.data.mensaje}</div>
      );
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="container text-center">
        <div className="card p-5 m-5 mx-auto" style={{ width: "60%" }}>
          <h1 className="display-5 fw-bold col-md-12">Recuperar Contraseña</h1>

          <div>
            <div className="container-fluid mb-3">
              <label htmlFor="usuario" className="form-label">
                Ingrese su nombre de Usuario:
              </label>
              <input
                type="text"
                name="usuario"
                id="usuario"
                className="form-control w-50 mx-auto"
                onChange={(e) => {
                  const { value } = e.target;
                  setUsuario(value);
                }}
                value={usuario}
              />
            </div>
            <div>
              <span className="card-text">
                Se enviara un correo electronico al correo que tiene asociado a
                su cuenta
              </span>
            </div>
          </div>
          {alert}
          <div className="container-fluid">
            <button
              className="btn btn-warning mx-auto mt-2 col-md-8"
              onClick={solicitarTokenRecuperacion}
            >
              Recuperar Contraseña
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RecuperarContrasena;
