import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function BorrarUsuario({ usuario, tabla }) {
  const history = useHistory();
  const [mensaje, setMensaje] = useState("");

  const mensajeError = () => {
    setMensaje(
      <div className="modal-body">
        <p>
          <strong>Ha ocurrido un error, intente nuevamente</strong>
        </p>
        <button
          className="btn btn-warning"
          type="button"
          data-bs-dismiss="modal"
          onClick={() => {
            history.push("/usuarios");
          }}
        >
          Cerrar
        </button>
      </div>
    );
  };

  const mostrarMaterias = (response) => {
    setMensaje(
      <div className="modal-body">
        <strong>No se pudo eliminar al usuario</strong>
        <p>
          Para poder eliminar este usuario, por favor asigne otro profesor a las
          siguientes materias:
        </p>
        <ul>
          {response.data.resultados.map((materia, key) => (
            <li key={key}>{materia.nombre}</li>
          ))}
        </ul>
        <button
          className="btn btn-warning"
          type="button"
          data-bs-dismiss="modal"
        >
          Cerrar
        </button>
      </div>
    );
  };

  const confirmar = () => {
    let cedula = "";
    setMensaje(
      <div className="modal-body">
        <p>
          <strong>Confirme su accion</strong>
        </p>
        <p>
          Para confirmar la accion de borrar el usuario, por favor ingrese la
          cedula (<strong>{usuario.cedula}</strong>) del usuario:
        </p>
        <input
          type="text"
          name="confirmarCedula"
          id="confirmarCedula"
          className="form-control"
          placeholder="Ingrese la cedula del usuario"
          onChange={(e) => {
            const { value } = e.target;
            cedula = value;
          }}
        />
        <button
          className="btn btn-danger mt-2"
          onClick={() => {
            borrarUsuario(parseInt(cedula), usuario.cedula, usuario._id);
          }}
        >
          <i className="bi bi-dash-circle"></i> Confirmar
        </button>
        <button
          className="btn btn-warning ms-1 mt-2"
          type="button"
          data-bs-dismiss="modal"
        >
          <i className="bi bi-x-circle"></i> Cancelar
        </button>
      </div>
    );
  };

  const borrarUsuario = async (confirmacion, cedula, id) => {
    if (confirmacion === cedula) {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/borrar/${id}`
      );
      if (response.status === 200) {
        if (response.data.mensaje === "No posee materias") {
          const resultado = await axios.delete(
            `${process.env.REACT_APP_SERVER_URL}/usuarios/borrar/${id}`
          );
          setMensaje(
            <div className="modal-body">
              <p>
                <strong>{resultado.data.mensaje}</strong>
              </p>
              <button
                className="btn btn-warning"
                type="button"
                data-bs-dismiss="modal"
                onClick={() => {
                  history.push("/usuarios");
                }}
              >
                Cerrar
              </button>
            </div>
          );
        } else if (response.data.mensaje === "Materias encontradas") {
          mostrarMaterias(response);
        } else {
          mensajeError();
        }
      } else {
        mensajeError();
      }
    } else {
      alert(`Cedula invalida`);
    }
  };

  return (
    <div className="text-dark">
      <button
        type="button"
        className={"btn btn-danger " + (tabla ? "rounded-0" : "w-100 mt-1")}
        data-bs-toggle="modal"
        data-bs-target={"#modalBorrar" + usuario.cedula}
        onClick={() => {
          setMensaje(
            <div className="modal-body">
              <p>
                <strong>¡Atencion!</strong>
              </p>
              <p>
                Estas a punto de borrar al usuario:{" "}
                <strong>{usuario.usuario}</strong>, esta accion es permanente y
                hara que todos los archivos y notas de este usuario sean
                eliminadas del sistema.
              </p>
              <p>
                <strong>¿Estas seguro que quieres continuar?</strong>
              </p>
              <button className="btn btn-danger" onClick={confirmar}>
                <i className="bi bi-dash-circle"></i> Borrar
              </button>
              <button
                className="btn btn-warning ms-1"
                type="button"
                data-bs-dismiss="modal"
              >
                <i className="bi bi-x-circle"></i> Cancelar
              </button>
            </div>
          );
        }}
      >
        <i className="bi bi-dash-circle"></i> Borrar
      </button>

      <div
        className="modal fade"
        id={"modalBorrar" + usuario.cedula}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="Ventana para Borrar"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="Calificar">
                Borrar usuario
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {mensaje}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BorrarUsuario;
