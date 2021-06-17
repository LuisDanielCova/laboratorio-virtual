import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../App";
import ReactTooltip from "react-tooltip";

function TarjetasMaterias({ materia }) {
  const user = useContext(UserContext);
  const [button, setButton] = useState();

  useEffect(() => {
    switch (user) {
      case "Administrador":
        setButton(
          <div className="col">
            <button className="btn btn-warning col-xl-5 me-2">
              <i className="bi bi-pencil"></i> Actualizar
            </button>
            <button className="btn btn-danger col-xl-4">
              <i className="bi bi-dash-circle"></i> Borrar
            </button>
          </div>
        );
        break;
      case "Profesor":
        setButton(
          <button className="btn btn-warning">
            <i class="bi bi-file-text"></i> Detalles
          </button>
        );
        break;
      case "Estudiante":
        // Si la materia esta llena, impedir que se inscriba
        if (materia.estudiantes.length > 30) {
          setButton(
            <div>
              <span data-for="noCupos" data-tip="No hay cupos">
                <button className="btn btn-warning" disabled>
                  <i class="bi bi-plus-circle"></i> Inscribir
                </button>
              </span>
              <ReactTooltip
                id="noCupos"
                place="bottom"
                type="dark"
                effect="float"
              />
            </div>
          );
        } else {
          setButton(
            <button className="btn btn-warning">
              <i class="bi bi-plus-circle"></i> Inscribir
            </button>
          );
        }

        break;
      default:
        <p>Error, cargue la pagina nuevamente</p>;
        break;
    }
  }, [user, materia]);

  return (
    <div className="col-lg-4 col-md-6 col-sm-12 my-2">
      <div className="card border-dark bg-light shadow">
        <h5 className="card-header bg-warning">{materia.nombre}</h5>
        <div className="card-body ">
          <h5 className="card-title">Profesor: {materia.profesor.nombre}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Seccion: {materia.seccion}
          </h6>
          <p className="card-text ">{materia.descripcion}</p>
          <p className="card-text">
            Inscritos: {materia.estudiantes.length} / 30
          </p>
          {button}
        </div>
      </div>
    </div>
  );
}

export default TarjetasMaterias;
