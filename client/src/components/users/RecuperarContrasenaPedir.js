import React, { useState } from "react";
import axios from "axios";
import Navbar from "../complements/Navbar";
import Footer from "../complements/Footer";
import FormError from "../errors/FormError";
import { useHistory, useParams } from "react-router-dom";

function RecuperarContrasenaPedir() {
  const { idUsuario, codigoConfirmacion } = useParams();
  const history = useHistory();

  const [contrasenas, setContrasenas] = useState({
    contrasenaNueva: "",
    contrasenaConfirmar: "",
  });

  const [alert, setAlert] = useState("");

  const [errors, setErrors] = useState([]);

  const cambiarContrasena = async () => {
    if (contrasenas.contrasenaNueva !== contrasenas.contrasenaConfirmar) {
      setErrors([
        {
          param: "contrasenaConfirmar",
          msg: "Por favor confirme la contraseña",
        },
      ]);
    } else {
      setErrors([]);
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/auth/recuperarContrasena/${idUsuario}/${codigoConfirmacion}`,
        contrasenas
      );
      if (response.status === 200) {
        alert("¡Contraseña cambiada con exito!");
        history.push("/login");
      } else if (response.status === 206) {
        setErrors(response.data.errors.errors);
      } else if (response.status === 207) {
        setErrors([
          {
            param: "contrasenaNueva",
            msg: response.data.mensaje,
          },
        ]);
      } else if (response.status === 208) {
        setAlert(
          <div className="alert alert-danger mt-2">{response.data.mensaje}</div>
        );
      } else {
        alert(`Ha ocurrido un error`);
        history.go(0);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container text-center">
        <div
          className="card p-5 m-5 mx-auto shadow-lg"
          style={{ width: "60%" }}
        >
          <h1 className="display-5 fw-bold col-md-12">Cambiar Contraseña</h1>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mt-2"
          >
            <div className="container-fluid mb-3 row">
              <div className="col-lg-6">
                <label htmlFor="contrasenaNueva" className="form-label mt-2">
                  Contraseña nueva:
                </label>
              </div>
              <div className="col-lg-6">
                <input
                  type="password"
                  name="contrasenaNueva"
                  id="contrasenaNueva"
                  className="form-control"
                  placeholder="Contraseña nueva"
                  onChange={(e) => {
                    const { value } = e.target;
                    setContrasenas({
                      ...contrasenas,
                      contrasenaNueva: value,
                    });
                  }}
                />
                <FormError errors={errors} campo={"contrasenaNueva"} />
              </div>
            </div>
            <div className="container-fluid mb-3 row">
              <div className="col-lg-6">
                <label
                  htmlFor="contrasenaConfirmar"
                  className="form-label mt-2"
                >
                  Confirme contraseña nueva:
                </label>
              </div>
              <div className="col-lg-6">
                <input
                  type="password"
                  name="contrasenaConfirmar"
                  id="contrasenaConfirmar"
                  className="form-control"
                  placeholder="Confirme contraseña"
                  onChange={(e) => {
                    const { value } = e.target;
                    setContrasenas({
                      ...contrasenas,
                      contrasenaConfirmar: value,
                    });
                  }}
                />
                <FormError errors={errors} campo={"contrasenaConfirmar"} />
              </div>
            </div>
            <button className="btn btn-warning" onClick={cambiarContrasena}>
              Cambiar Contraseña
            </button>
            {alert}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RecuperarContrasenaPedir;
