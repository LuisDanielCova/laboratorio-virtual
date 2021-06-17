import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

function TarjetasActividades(props) {
  const user = useContext(UserContext);
  const [button, setButton] = useState();

  useEffect(() => {
    switch (user) {
      case "Administrador":
        setButton();
        break;
      case "Profesor":
        setButton(
          <div className="col">
            <button className="btn btn-warning col-xl-5 me-2">
              <i className="bi bi-pencil"></i> Editar
            </button>
            <button className="btn btn-danger col-xl 4">
              <i className="bi bi-dash-circle"></i> Borrar
            </button>
          </div>
        );
        break;
      case "Estudiante":
        setButton(
          <button className="btn btn-warning">
            <i className="bi bi-cloud-arrow-up"></i> Entregar
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
  }, [user]);

  return (
    <div className="col-lg-6 col-md-6 col-sm-12 my-2">
      <div className="card border-dark bg-light shadow">
        <h5 className="card-header bg-warning">{props.actividad.nombre}</h5>
        <div className="card-body ">
          <h6 className="card-subtitle mb-2 text-muted">
            Fecha de Entrega: {props.actividad.fechaEntrega.slice(0, 10)}
          </h6>
          <p className="card-text ">{props.actividad.descripcion}</p>
          <p className="card-text">Nota: {props.actividad.nota}</p>
          {button}
        </div>
      </div>
    </div>
  );
}

export default TarjetasActividades;
