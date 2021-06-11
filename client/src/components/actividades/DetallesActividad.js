import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import TarjetasArchivoProfesor from "../cards/TarjetasArchivoProfesor";
import TarjetasArchivoProfesorEditar from "../cards/TarjetasArchivoProfesorEditar";
import TarjetasArchivosEstudiantesEditar from "../cards/TarjetasArchivosEstudiantesEditar";
import TarjetasArchivosEstudiantesSubir from "../cards/TarjetasArchivosEstudiantesSubir";
import TarjetasMostrarArchivosEstudiantes from "../cards/TarjetasMostrarArchivosEstudiantes";

function DetallesActividad() {
  const user = useContext(UserContext);
  const [estado, setEstado] = useState();
  const [acciones, setAcciones] = useState("");
  const [archivoProfesor, setArchivoProfesor] = useState();
  const [archivosEstudiantes, setArchivosEstudiantes] = useState([]);

  const actividad = {
    nombre: "Arreglos - Parte 1",
    descripcion:
      "Invertir los numeros dentro de un arreglo o algo asi idk, c++ y vaina",
    fecha_entrega: new Date().toISOString().slice(0, 10),
    materia: {
      nombre: "Programacion 3",
    },
    nota: 20,
    archivo: {
      nombre: "vaina.zip",
      url: "http://localhost:3001/vaina.zip",
    },
  };

  useEffect(() => {
    setArchivosEstudiantes([
      {
        nombre: "vaina.zip",
        alumno: "alumno1",
        url: "http://localhost:3001/vaina2.zip",
      },
      {
        nombre: "vaina2.zip",
        alumno: "Estudiante",
        url: "http://localhost:3001/vaina2.zip",
      },
    ]);
  }, []);

  useEffect(() => {
    if (actividad.archivo !== undefined) {
      if (user === "Estudiante" || user === "Administrador") {
        setArchivoProfesor();
        <TarjetasArchivoProfesor archivo={actividad.archivo} />;
      } else if (user === "Profesor") {
        setArchivoProfesor();
        <TarjetasArchivoProfesorEditar archivo={actividad.archivo} />;
      }
    } else {
      setArchivoProfesor(
        <p className="card-text">El profesor no ha subido un archivo</p>
      );
    }
  }, [actividad.archivo, user]);

  useEffect(() => {
    switch (user) {
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
            <button className="btn btn-warning">
              <i className="bi bi-pencil"></i> Editar
            </button>
            <button className="btn btn-danger mt-1">
              <i className="bi bi-dash-circle"></i> Borrar
            </button>
          </div>
        );
        break;
      case "Estudiante":
        const archivoEntregado = archivosEstudiantes.find(
          (archivo) => archivo.alumno === user
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
  }, [user, archivosEstudiantes]);

  return (
    <div className="col m-3">
      <div className="card py-3 p shadow-lg">
        <h3 className="fw-bold text-center">{actividad.nombre}</h3>
        <div className="row m-3">
          <div className="col-lg-8 my-2">
            <div className="card p-3">
              <h4 className="fw-bold card-text">Descripcion:</h4>
              <p className="card-text">{actividad.descripcion}</p>
              {archivoProfesor}
              <h4 className="fw-bold card-text">Fecha de Entrega:</h4>
              <p className="card-text">{actividad.fecha_entrega}</p>
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
                  <i className="bi bi-laptop"></i> {actividad.materia.nombre}
                </p>
                <h5 className="fw-bold card-text">
                  <i className="bi bi-award"></i> Nota:
                </h5>
                <p className="card-text">
                  <i className="bi bi-star"></i> {actividad.nota} / 20
                </p>
              </div>
              {acciones}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallesActividad;
