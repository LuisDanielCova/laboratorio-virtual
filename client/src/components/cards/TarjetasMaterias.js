import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Routes";
import { useHistory } from "react-router-dom";

function TarjetasMaterias({ materia }) {
  const { usuario } = useContext(UserContext);
  const [button, setButton] = useState();
  const history = useHistory();

  const borrarMateria = (materia) => {
    const respuesta = prompt(
      `Para confirmar que quieres borrar la materia, por favor ingresa en el cuadro de dialogo lo siguiente: ${materia.nombre}`,
      ""
    );
    if (respuesta === materia.nombre) {
      alert(`Materia Borrada`);
    } else {
      alert(`La Materia no fue borrada`);
    }
  };

  useEffect(() => {
    switch (usuario.cargo) {
      case "Administrador":
        setButton(
          <div className="col">
            <button
              className="btn btn-warning me-2"
              onClick={() => {
                history.push(`/materias/${materia._id}`);
              }}
            >
              <i className="bi bi-file-text"></i> Detalles
            </button>
            <button
              className="btn btn-warning col-xl-5 me-2"
              onClick={() => {
                history.push(`/materia/crear/${materia._id}`);
              }}
            >
              <i className="bi bi-pencil"></i> Actualizar
            </button>
            <button
              className="btn btn-danger col-xl-4 mt-2"
              onClick={() => {
                borrarMateria(materia);
              }}
            >
              <i className="bi bi-dash-circle"></i> Borrar
            </button>
          </div>
        );
        break;
      case "Profesor":
        setButton(
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/materias/${materia._id}`);
            }}
          >
            <i className="bi bi-file-text"></i> Detalles
          </button>
        );
        break;
      case "Estudiante":
        setButton(
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/materias/${materia._id}`);
            }}
          >
            <i className="bi bi-file-text"></i> Detalles
          </button>
        );
        break;
      default:
        <p>Error, cargue la pagina nuevamente</p>;
        break;
    }
  }, [usuario, materia, history]);

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
