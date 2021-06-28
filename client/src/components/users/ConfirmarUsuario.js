import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../complements/Navbar";
import Footer from "../complements/Footer";

function ConfirmarUsuario() {
  const history = useHistory();
  const [alert, setAlert] = useState("");
  const { tokenConfirmacion } = useParams();

  useEffect(() => {
    const confirmarCuenta = async () => {
      if (tokenConfirmacion !== undefined) {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/usuarios/confirmar/${tokenConfirmacion}`
        );
        if (response.status === 200) {
          setAlert(
            <div className="alert alert-success mt-3 mb-0">
              Cuenta confirmada correctamente, sera redirigido a la pagina de
              inicio de sesion unos segundos
            </div>
          );
          setTimeout(() => {
            history.push("/login");
          }, 5000);
        } else {
          setAlert(
            <div className="alert alert-danger mt-3 mb-0">
              El token de confirmacion es incorrecto.
            </div>
          );
        }
      }
    };

    confirmarCuenta();
  }, [tokenConfirmacion, history]);

  return (
    <div className="">
      <Navbar />
      <div className="container text-center">
        <div className="card p-5 m-5 mx-auto w-50">
          <h1 className="display-5 fw-bold col-md-12">Confirmar Usuario</h1>
          {alert}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ConfirmarUsuario;
