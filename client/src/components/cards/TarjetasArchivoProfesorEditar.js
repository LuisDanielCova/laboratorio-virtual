import React from "react";

const TarjetasArchivoProfesorEditar = ({ archivo }) => {
  return (
    <div>
      <h5 className="card-text">Archivos de la Actividad:</h5>
      <div className="card col-lg-3 mb-2">
        <h6 className="card-header bg-dark text-center text-light">
          <i className="col bi bi-file-earmark"></i> {archivo.nombre}
        </h6>
        <button className="col btn btn-warning rounded-0">
          <i className="col bi bi-download"></i> Descargar
        </button>
        <button
          className="col btn btn-danger border-0 rounded-0"
          style={{ backgroundColor: "#E24E3A" }}
        >
          <i className="col bi bi-dash-circle"></i> Borrar
        </button>
      </div>
    </div>
  );
};

export default TarjetasArchivoProfesorEditar;
