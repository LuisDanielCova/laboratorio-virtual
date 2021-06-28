import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Routes";
import Sidebar from "../complements/Sidebar";
import FormError from "../errors/FormError";

function CambiarContrasena() {
  const { usuario } = useContext(UserContext);
  const history = useHistory();

  const [contrasenas, setContrasenas] = useState({
    contrasenaAnterior: "",
    contrasenaNueva: "",
    contrasenaConfirmar: "",
  });

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
        `${process.env.REACT_APP_SERVER_URL}/usuarios/actualizar_contrasena/${usuario.id}`,
        contrasenas
      );
      if (response.status === 200) {
        alert(`Contraseña cambiada correctamente`);
        history.push(`/usuarios/${usuario.id}`);
      } else if (response.status === 206) {
        setErrors([{ param: "contrasenaNueva", msg: response.data.mensaje }]);
      } else {
        console.log(response.data);
      }
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col m-3 text-center">
          <div className="card py-3 shadow-lg w-50 mx-auto p-3">
            <h3 className="fw-bold col-xl-12 text-center">
              Cambiar Contraseña
            </h3>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="container-fluid mb-3">
                <label htmlFor="contrasenaAnterior" className="form-label">
                  Contraseña anterior:
                </label>
                <input
                  type="password"
                  name="contrasenaAnterior"
                  id="contrasenaAnterior"
                  className="form-control"
                  placeholder="Contraseña anterior"
                  onChange={(e) => {
                    const { value } = e.target;
                    setContrasenas({
                      ...contrasenas,
                      contrasenaAnterior: value,
                    });
                  }}
                />
                <FormError errors={errors} campo={"contrasenaAnterior"} />
              </div>
              <div className="container-fluid mb-3">
                <label htmlFor="contrasenaNueva">Contraseña nueva:</label>
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
              <div className="container-fluid mb-3">
                <label htmlFor="contrasenaConfirmar">
                  Confirme contraseña nueva:
                </label>
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
              <button className="btn btn-warning" onClick={cambiarContrasena}>
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CambiarContrasena;
