import React, { useState } from "react";
import axios from "axios";

function CrearNota({ estudiante, idActividad }) {
  const [nota, setNota] = useState({
    calificacion: 0,
    actividad: idActividad,
    estudiante: estudiante._id,
  });

  const calificarEstudiante = async (nota) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/notas/actualizar/`,
        nota
      );
      if (response.status === 200) {
        alert(`Alumno calificado!`);
      } else {
        alert(`Ha ocurrido un error`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="">
      <button
        type="button"
        className="btn btn-warning border-0 rounded-0"
        data-bs-toggle="modal"
        data-bs-target={"#modal" + estudiante._id}
        style={{ backgroundColor: "#F59B18", width: "100%" }}
      >
        <i className="col bi bi-pen"></i> Calificar
      </button>

      <div
        className="modal fade"
        id={"modal" + estudiante._id}
        tabIndex="-1"
        aria-labelledby="Ventana para Calificar"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="Calificar">
                Calificar - {estudiante.apellido}, {estudiante.nombre}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="nota" className="form-label">
                Nota:{" "}
              </label>
              <input
                type="number"
                name="nota"
                id="nota"
                placeholder="1"
                min="1"
                className="form-control"
                onChange={(e) => {
                  const { value } = e.target;
                  setNota({ ...nota, calificacion: value });
                }}
                required
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  calificarEstudiante(nota);
                }}
              >
                Calificar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearNota;
