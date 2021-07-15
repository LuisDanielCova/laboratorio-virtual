import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function BorrarActividad({ actividad, tarjeta }) {
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
            history.push(
              `/materias/${actividad.materia._id}/actividades/${actividad._id}`
            );
          }}
        >
          Cerrar
        </button>
      </div>
    );
  };

  const confirmar = () => {
    let nombre = "";
    setMensaje(
      <div className="modal-body">
        <p>
          <strong>Confirme su accion</strong>
        </p>
        <p>
          Para confirmar la accion de borrar la actividad, por favor ingrese el
          nombre (<strong>{actividad.nombre}</strong>) de la actividad:
        </p>
        <input
          type="text"
          name="confirmarCedula"
          id="confirmarCedula"
          className="form-control"
          placeholder="Ingrese la cedula del usuario"
          onChange={(e) => {
            const { value } = e.target;
            nombre = value;
          }}
        />
        <button
          className="btn btn-danger mt-2"
          onClick={() => {
            borrarActividad(nombre, actividad.nombre, actividad._id);
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

  const borrarActividad = async (confirmacion, nombre, id) => {
    if (confirmacion === nombre) {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/materias/${actividad.materia._id}/actividades/${actividad._id}/borrar`
      );
      if (response.status === 200) {
        setMensaje(
          <div className="modal-body">
            <p>
              <strong>{response.data.mensaje}</strong>
            </p>
            <button
              className="btn btn-warning"
              type="button"
              data-bs-dismiss="modal"
              onClick={() => {
                history.push(`/materias/${actividad.materia._id}`);
              }}
            >
              Cerrar
            </button>
          </div>
        );
      } else {
        mensajeError();
      }
    } else {
      alert(`Nombre invalido`);
    }
  };

  return (
    <div className="text-dark">
      <button
        type="button"
        className={"btn btn-danger " + (tarjeta ? "col-xl mt-2" : "w-100 mt-1")}
        data-bs-toggle="modal"
        data-bs-target="#modalBorrar"
        onClick={() => {
          setMensaje(
            <div className="modal-body">
              <p>
                <strong>¡Atencion!</strong>
              </p>
              <p>
                Estas a punto de borrar la actividad:{" "}
                <strong>{actividad.nombre}</strong>, esta accion es{" "}
                <strong>permanente</strong> y hara que todos los archivos y
                notas de esta actividad sean eliminadas del sistema.
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
        id="modalBorrar"
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
                Borrar Actividad
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

export default BorrarActividad;
