import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import { UserContext } from "../../Routes";

export const TarjetaInscribirMateria = ({ materia }) => {
  const { usuario } = useContext(UserContext);
  const [button, setButton] = useState("");

  const inscribirMateria = async () => {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/materias/inscribir/${materia._id}/${usuario.id}`
    );
    console.log(response);
  };

  useEffect(() => {
    if (materia.estudiantes.length > 30) {
      setButton(
        <div>
          <span data-for="noCupos" data-tip="No hay cupos">
            <button className="btn btn-warning" disabled>
              <i className="bi bi-plus-circle"></i> Inscribir
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
    } else if (
      materia.estudiantes.filter((e) => e._id === usuario.id).length > 0
    ) {
      console.log(usuario.id);
      setButton(
        <div>
          <span data-for="yaInscrito" data-tip="Ya esta inscrito">
            <button className="btn btn-warning" disabled>
              <i className="bi bi-plus-circle"></i> Ya esta inscrito
            </button>
          </span>
          <ReactTooltip
            id="yaInscrito"
            place="bottom"
            type="dark"
            effect="float"
          />
        </div>
      );
    } else {
      setButton(
        <div>
          <button
            className="btn btn-warning"
            onClick={() => {
              inscribirMateria(materia._id);
            }}
          >
            <i className="bi bi-plus-circle"></i> Inscribir
          </button>
        </div>
      );
    }
    // eslint-disable-next-line
  }, [materia]);

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
};
