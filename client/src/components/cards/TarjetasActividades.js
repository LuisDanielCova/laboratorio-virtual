import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Routes";

function TarjetasActividades({ actividad }) {
  const history = useHistory();
  const { usuario } = useContext(UserContext);
  const [button, setButton] = useState("");

  const borrarActividad = (actividad) => {
    const respuesta = prompt(
      `Para confirmar que quieres borrar la actividad, por favor ingresa en el cuadro de dialogo lo siguiente: ${actividad.nombre}`,
      ""
    );
    if (respuesta === actividad.nombre) {
      alert(`Actividad Borrada`);
    } else {
      alert(`La Materia no fue borrada`);
    }
  };

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
            <button
              className="btn btn-danger col-xl mt-2"
              onClick={() => {
                borrarActividad(actividad);
              }}
            >
              <i className="bi bi-dash-circle"></i> Borrar
            </button>
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
