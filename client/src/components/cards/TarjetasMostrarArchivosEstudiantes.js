import React from "react";

const TarjetasMostrarArchivosEstudiantes = ({ archivosEstudiantes }) => {
  return (
    <div>
      <div className="alert alert-warning card-text">
        A continuacion se muestran los archivos de los alumnos:
      </div>
      <div className="row">
        {archivosEstudiantes.map((val, key) => {
          return (
            <div className="col-lg-3 pe-0 my-1">
              <div className="card">
                <h6 className="card-header bg-dark text-light">
                  <i className="bi bi-person"></i> {val.alumno}
                </h6>
                <button
                  key={key}
                  className="col btn btn-warning border-0 rounded-0"
                  style={{ backgroundColor: "#F59B18" }}
                >
                  <i className="col bi bi-pen"></i> Calificar
                </button>
                <button key={key} className="col btn btn-warning rounded-0">
                  <i className="col bi bi-file-earmark"></i> Descargar
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TarjetasMostrarArchivosEstudiantes;
