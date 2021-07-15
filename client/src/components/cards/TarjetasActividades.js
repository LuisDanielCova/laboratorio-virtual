import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Routes";
import BorrarActividad from "../actividades/BorrarActividad";

function TarjetasActividades({ actividad }) {
  const history = useHistory();
  const { usuario } = useContext(UserContext);
  const [button, setButton] = useState("");

  useEffect(() => {
    switch (usuario.cargo) {
      case "Administrador":
        setButton(
          <button
            className="btn btn-warning col-xl me-2"
            onClick={() => {
              history.push(
                `/materias/${actividad.materia._id}/actividades/${actividad._id}`
              );
            }}
          >
            <i className="bi bi-file-text"></i> Detalles
          </button>
        );
        break;
      case "Profesor":
        setButton(
          <div className="col">
            <button
              className="btn btn-warning col-xl me-2"
              onClick={() => {
                history.push(
                  `/materias/${actividad.materia._id}/actividades/${actividad._id}`
                );
              }}
            >
              <i className="bi bi-file-text"></i> Detalles
            </button>
            <button
              className="btn btn-warning col-xl me-2"
              onClick={() => {
                history.push(
                  `/materias/${actividad.materia._id}/actividad/crear/${actividad._id}`
                );
              }}
            >
              <i className="bi bi-pencil"></i> Editar
            </button>
            <BorrarActividad tarjeta={true} actividad={actividad} />
          </div>
        );
        break;
      case "Estudiante":
        setButton(
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(
                `/materias/${actividad.materia._id}/actividades/${actividad._id}`
              );
            }}
          >
            <i className="bi bi-file-text"></i> Detalles
          </button>
        );
        break;
      default:
        setButton(
          <p className="card-text">
            Ha ocurrido un error, cargue nuevamente la pagina
          </p>
        );
    }
  }, [usuario, actividad, history]);

  return (
    <div className="col-lg-6 col-md-6 col-sm-12 my-2">
      <div className="card border-dark bg-light shadow">
        <h5 className="card-header bg-warning">{actividad.nombre}</h5>
        <div className="card-body ">
          <h6 className="card-subtitle mb-2 text-muted">
            Fecha de Entrega: {actividad.fechaEntrega.slice(0, 10)}
          </h6>
          <p className="card-text ">{actividad.descripcion}</p>
          <p className="card-text">Nota: {actividad.nota}</p>
          {button}
        </div>
      </div>
    </div>
  );
}

export default TarjetasActividades;
