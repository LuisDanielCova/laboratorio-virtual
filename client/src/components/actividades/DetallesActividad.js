import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Routes";
import axios from "axios";
import TarjetasArchivoProfesor from "../cards/TarjetasArchivoProfesor";
import TarjetasArchivoProfesorEditar from "../cards/TarjetasArchivoProfesorEditar";
import TarjetasArchivosEstudiantesEditar from "../cards/TarjetasArchivosEstudiantesEditar";
import TarjetasArchivosEstudiantesSubir from "../cards/TarjetasArchivosEstudiantesSubir";
import TarjetasMostrarArchivosEstudiantes from "../cards/TarjetasMostrarArchivosEstudiantes";
import { TarjetasArchivoProfesorSubir } from "../cards/TarjetasArchivoProfesorSubir";
import Sidebar from "../complements/Sidebar";
import { useHistory, useParams, withRouter } from "react-router-dom";
import BorrarActividad from "./BorrarActividad";

function DetallesActividad() {
  const { usuario } = useContext(UserContext);
  const history = useHistory();
  const { idActividad, idMateria } = useParams();
  const [actividad, setActividad] = useState();
  const [archivos, setArchivos] = useState([]);
  const [estado, setEstado] = useState();
  const [acciones, setAcciones] = useState("");
  const [archivoProfesor, setArchivoProfesor] = useState();

  useEffect(() => {
    const conseguirActividad = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/materias/${idMateria}/actividades/${idActividad}`
      );
      setActividad(response.data.actividad);
    };
    conseguirActividad();
  }, [idMateria, idActividad]);

  useEffect(() => {
    const conseguirArchivos = async () => {
      if (actividad !== undefined) {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/archivos/${idMateria}/actividades/${idActividad}/`
        );
        setArchivos(response.data.archivos);
      }
    };
    conseguirArchivos();
  }, [actividad, idMateria, idActividad]);

  useEffect(() => {
    if (archivos.length > 0) {
      const archivo = archivos.find((value) => {
        return value.usuario.cargo === "Profesor";
      });
      if (archivo !== undefined) {
        if (
          usuario.cargo === "Estudiante" ||
          usuario.cargo === "Administrador"
        ) {
          setArchivoProfesor(<TarjetasArchivoProfesor archivo={archivo} />);
        } else if (usuario.cargo === "Profesor") {
          setArchivoProfesor(
            <TarjetasArchivoProfesorEditar archivo={archivo} />
          );
        }
      } else {
        if (
          usuario.cargo === "Estudiante" ||
          usuario.cargo === "Administrador"
        ) {
          setArchivoProfesor(
            <p className="card-text">El profesor no ha subido un archivo</p>
          );
        } else if (usuario.cargo === "Profesor") {
          setArchivoProfesor(<TarjetasArchivoProfesorSubir />);
        }
      }
    }
  }, [archivos, usuario]);

  useEffect(() => {
    const archivosEstudiantes = archivos.filter((value) => {
      return value.usuario.cargo === "Estudiante";
    });
    switch (usuario.cargo) {
      case "Administrador":
        setEstado(
          <span className="alert alert-danger card-text">
            El administrador no puede observar los archivos
          </span>
        );
        break;
      case "Profesor":
        if (archivosEstudiantes.length > 0) {
          setEstado(
            <div>
              <div className="alert alert-warning card-text">
                A continuacion se muestran los archivos de los alumnos:
              </div>
              <div className="row">
                {archivosEstudiantes.map((val, key) => {
                  return (
                    <TarjetasMostrarArchivosEstudiantes val={val} key={key} />
                  );
                })}
              </div>
            </div>
          );
        } else {
          setEstado(
            <span className="alert alert-danger card-text">
              Los alumnos no han entregado ningun archivo
            </span>
          );
        }
        setAcciones(
          <div className="card p-2 mt-1">
            <h4 className="fw-bold">Acciones:</h4>
            <button
              className="btn btn-warning"
              onClick={() => {
                history.push(
                  `/materias/${idMateria}/actividad/crear/${idActividad}`
                );
              }}
            >
              <i className="bi bi-pencil"></i> Editar
            </button>
            <BorrarActividad actividad={actividad} tarjeta={false} />
          </div>
        );
        break;
      case "Estudiante":
        const archivoEntregado = archivos.find(
          (archivo) => archivo.usuario._id === usuario.id
        );
        if (archivoEntregado === undefined) {
          setEstado(<TarjetasArchivosEstudiantesSubir />);
        } else {
          setEstado(
            <TarjetasArchivosEstudiantesEditar
              archivoEntregado={archivoEntregado}
            />
          );
        }
        break;
      default:
        setEstado(<p className="card-text">Error, recargue la pagina</p>);
        break;
    }
  }, [usuario, archivos, history, idActividad, idMateria, actividad]);

  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col m-3">
          <div className="card py-3 p shadow-lg">
            <h3 className="fw-bold text-center">
              {actividad && actividad.nombre}
            </h3>
            <div className="row m-3">
              <div className="col-lg-8 my-2">
                <div className="card p-3">
                  <h4 className="fw-bold card-text">Descripcion:</h4>
                  <p className="card-text">
                    {actividad && actividad.descripcion}
                  </p>
                  {archivoProfesor}
                  <h4 className="fw-bold card-text">Fecha de Entrega:</h4>
                  <p className="card-text">
                    {actividad && actividad.fechaEntrega.slice(0, 10)}
                  </p>
                  <h4 className="fw-bold card-text">Estado:</h4>
                  {estado}
                </div>
              </div>
              <div className="col-lg-4 my-2">
                <div className="card p-2">
                  <div className="card p-2">
                    <h5 className="fw-bold card-text">
                      <i className="bi bi-book"></i> Materia:
                    </h5>
                    <p className="card-text">
                      <i className="bi bi-laptop"></i>{" "}
                      {actividad && actividad.materia.nombre}
                    </p>
                    <h5 className="fw-bold card-text">
                      <i className="bi bi-award"></i> Nota:
                    </h5>
                    <p className="card-text">
                      <i className="bi bi-star"></i>{" "}
                      {actividad && actividad.nota}
                    </p>
                  </div>
                  {acciones}
                </div>
              </div>
            </div>
            <div className="container text-center">
              <a className="link-dark" href={`/materias/${idMateria}`}>
                Volver
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(DetallesActividad);
