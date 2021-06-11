import React from "react";
import CrearNota from "../actividades/CrearNota";

const TarjetasMostrarArchivosEstudiantes = ({ val }) => {
  return (
    <div className="col-lg-3 pe-0 my-1">
      <div className="card">
        <h6 className="card-header bg-dark text-light">
          <i className="bi bi-person"></i> {val.alumno}
        </h6>
        <div className="col">
          <CrearNota estudiante={val.alumno} />
        </div>
        <button className="col btn btn-warning rounded-0">
          <i className="col bi bi-file-earmark"></i> Descargar
        </button>
      </div>
    </div>
  );
};

export default TarjetasMostrarArchivosEstudiantes;
