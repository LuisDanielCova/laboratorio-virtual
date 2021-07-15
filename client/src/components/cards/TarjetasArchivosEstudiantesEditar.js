import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const TarjetasArchivosEstudiantesEditar = ({ archivoEntregado }) => {
  const history = useHistory();

  const descargarArchivo = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/archivos/descargar/${archivoEntregado.nombre}`
    );
    if (response.status === 200) {
      window.open(response.config.url);
    }
  };

  const borrarArchivo = async () => {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/archivos/borrar/${archivoEntregado._id}`
    );
    if (response.status === 200) {
      alert(`Archivo borrado`);
      history.go(0);
    }
  };

  return (
    <div>
      <div className="alert alert-warning card-text">¡Entregado!</div>
      <h5 className="card-text">Tu Archivo:</h5>
      <div className="col-lg-3 pe-0 my-1">
        <div className="card">
          <h6 className="card-header bg-dark text-light text-center">
            <i className="bi bi-file-earmark"></i> Archivo
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
            <i className="col bi bi-dash-circle"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetasArchivosEstudiantesEditar;
