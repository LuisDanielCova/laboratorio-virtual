import React from "react";

const TarjetasArchivosEstudiantesEditar = ({ archivoEntregado }) => {
  return (
    <div>
      <div className="alert alert-warning card-text">¡Entregado!</div>
      <h5 className="card-text">Tus Archivos:</h5>
      <div className="col-lg-3 pe-0 my-1">
        <div className="card">
          <h6 className="card-header bg-dark text-light text-center">
            <i className="bi bi-file-earmark"></i> {archivoEntregado.nombre}
          </h6>
          <button className="col btn btn-warning rounded-0">
            <i className="col bi bi-download"></i> Descargar
          </button>
          <button
            className="col btn btn-danger border-0 rounded-0"
            style={{ backgroundColor: "#E24E3A" }}
          >
            <i className="col bi bi-dash-circle"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetasArchivosEstudiantesEditar;
