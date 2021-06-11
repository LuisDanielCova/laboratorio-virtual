import React from "react";

function CrearNota({ estudiante }) {
  return (
    <div className="">
      <button
        type="button"
        className="btn btn-warning border-0 rounded-0"
        data-bs-toggle="modal"
        data-bs-target="#modalCalificar"
        style={{ backgroundColor: "#F59B18", width: "100%" }}
      >
        <i className="col bi bi-pen"></i> Calificar
      </button>

      <div
        className="modal fade"
        id="modalCalificar"
        tabIndex="-1"
        aria-labelledby="Ventana para Calificar"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="Calificar">
                Calificar - {estudiante}
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
              <button type="button" className="btn btn-warning">
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
