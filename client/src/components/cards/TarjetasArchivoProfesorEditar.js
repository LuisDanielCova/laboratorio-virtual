import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TarjetasArchivoProfesorEditar = ({ archivo }) => {
  const history = useHistory();

  const descargarArchivo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/archivos/descargar/${archivo.nombre}`
    );
    if (response.status === 200) {
      window.open(response.config.url);
    }
  };

  const borrarArchivo = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/archivos/borrar/${archivo._id}`
    );
    if (response.status === 200) {
      alert(`Archivo borrado`);
      history.go(0);
    }
  };

  return (
    <div>
      <h5 className="card-text">Archivos de la Actividad:</h5>
      <div className="card col-lg-3 mb-2">
        <h6 className="card-header bg-dark text-center text-light">
          <i className="col bi bi-file-earmark"></i> Archivo de Clases
        </h6>
        <button
          className="col btn btn-warning rounded-0"
          onClick={descargarArchivo}
        >
          <i className="col bi bi-download"></i> Descargar
        </button>
        <button
          className="col btn btn-danger border-0 rounded-0"
          style={{ backgroundColor: "#E24E3A" }}
          onClick={borrarArchivo}
        >
          <i className="col bi bi-dash-circle"></i> Borrar
        </button>
      </div>
    </div>
  );
};

export default TarjetasArchivoProfesorEditar;
