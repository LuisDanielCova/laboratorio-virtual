import React, { useState, useEffect, useContext } from "react";
import TarjetasActividades from "../cards/TarjetasActividades";
import { useHistory, useParams, withRouter } from "react-router-dom";
import Sidebar from "../complements/Sidebar";
import axios from "axios";
import { UserContext } from "../../Routes";
import BorrarMateria from "./BorrarMateria";

function DetallesMateria() {
  const history = useHistory();
  const [materia, setMateria] = useState();
  const [actividades, setActividades] = useState();
  const [tarjetasActividades, setTarjetasActividades] = useState([]);
  const [aviso, setAviso] = useState();
  const [alumnos, setAlumnos] = useState();
  const { usuario } = useContext(UserContext);
  const [acciones, setAcciones] = useState("");
  const { id } = useParams();

  useEffect(() => {
    if (usuario.cargo === "Administrador") {
      setAcciones(
        <div className="card p-2 mt-1">
          <h4 className="fw-bold">Acciones:</h4>
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/materia/crear/${id}`);
            }}
          >
            <i className="bi bi-pencil"></i> Editar
          </button>
          <BorrarMateria tarjeta={false} materia={materia} />
        </div>
      );
    } else if (usuario.cargo === "Profesor") {
      setAcciones(
        <div className="card p-2 mt-1">
          <h4 className="fw-bold">Acciones:</h4>
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/materias/${id}/actividad/crear`);
            }}
          >
            Crear Nueva Actividad
          </button>
        </div>
      );
    }
  }, [usuario, history, id, materia]);

  useEffect(() => {
    const conseguirMateria = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/materias/${id}`
      );
      setMateria(response.data.materia);
    };
    conseguirMateria();
  }, [id]);

  useEffect(() => {
    if (materia !== undefined) {
      const estudiantes = materia.estudiantes;
      setAlumnos([
        estudiantes.map((val, key) => {
          return (
            <p className="card-text" key={key}>
              <i className="bi bi-person"></i>
              {val.nombre} - {val.correo}
            </p>
          );
        }),
      ]);
    }
  }, [materia]);

  useEffect(() => {
    const conseguirActividades = async () => {
      if (materia !== undefined) {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/materias/${id}/actividades`
        );
        if (response.data.lista_actividades !== undefined) {
          setActividades(response.data.lista_actividades);
        }
      }
    };
    conseguirActividades();
  }, [materia, id]);

  useEffect(() => {
    if (actividades !== undefined) {
      if (actividades.length > 0) setAviso("");
      actividades.map((val, key) => {
        return setTarjetasActividades((tarjetaAnterior) => [
          ...tarjetaAnterior,
          <TarjetasActividades actividad={val} key={key} />,
        ]);
      });
    } else {
      setAviso(
        <div className="col-xl-12">
          <div className="alert alert-warning">No hay actividades</div>
        </div>
      );
    }
  }, [actividades]);

  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col m-3">
          <div className="card py-3 shadow-lg">
            <h3 className="fw-bold col-md-12 text-center">
              {materia && materia.nombre}
            </h3>
            <div className="row m-3">
              <div className="col-lg-8 my-2">
                <div className="card p-2">
                  <p className="card-text">
                    <strong>Descripcion:</strong>{" "}
                    {materia && materia.descripcion}
                  </p>
                  <h4 className="fw-bold card-text">
                    <i className="bi bi-clipboard-check"></i> Actividades:
                  </h4>
                  <div className="row">
                    {aviso && aviso}
                    {tarjetasActividades &&
                      tarjetasActividades.map((val) => {
                        return val;
                      })}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 my-2">
                <div className="card p-2">
                  <div className="card p-2">
                    <h5 className="fw-bold card-text">
                      <i className="bi bi-person-badge"></i> Profesor:
                    </h5>
                    <p className="card-text">
                      <i className="bi bi-eyeglasses"></i>{" "}
                      {materia && materia.profesor.nombre} -{" "}
                      {materia && materia.profesor.correo}
                    </p>
                  </div>
                  <div className="card p-2 my-1">
                    <h5 className="fw-bold card-text">
                      <i className="bi bi-people"></i> Alumnos:
                    </h5>
                    {alumnos && alumnos}
                  </div>
                  {acciones}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(DetallesMateria);
