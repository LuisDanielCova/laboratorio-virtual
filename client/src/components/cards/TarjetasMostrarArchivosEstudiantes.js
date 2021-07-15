import React from "react";
import axios from "axios";
import CrearNota from "../actividades/CrearNota";

const TarjetasMostrarArchivosEstudiantes = ({ val }) => {
  const descargarArchivo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/archivos/descargar/${val.nombre}`
    );
    if (response.status === 200) {
      window.open(response.config.url);
    }
  };

  return (
    <div className="col-lg-4 pe-0 my-1">
      <div className="card">
        <h6 className="card-header bg-dark text-light">
          <i className="bi bi-person"></i> {val.usuario.apellido},{" "}
          {val.usuario.nombre}
        </h6>
        <div className="col">
          <CrearNota estudiante={val.usuario} idActividad={val.actividad._id} />
        </div>
        <button
          className="col btn btn-warning rounded-0"
          onClick={descargarArchivo}
        >
          <i className="col bi bi-file-earmark"></i> Descargar
        </button>
      </div>
    </div>
  );
};

export default TarjetasMostrarArchivosEstudiantes;
