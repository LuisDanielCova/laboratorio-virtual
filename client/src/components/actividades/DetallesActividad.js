import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

function DetallesActividad() {
  const user = useContext(UserContext);
  const [estado, setEstado] = useState();
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
      setArchivoProfesor(
        <div>
          <h5 className="card-text">Archivos de la Actividad:</h5>
          <button className="col btn btn-warning me-1 mb-1">
            <i className="col bi bi-file-earmark"></i>{" "}
            {actividad.archivo.nombre}
          </button>
        </div>
      );
    } else {
      setArchivoProfesor(
        <p className="card-text">El profesor no ha subido un archivo</p>
      );
    }
  }, []);

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
              {archivosEstudiantes.map((val, key) => {
                return (
                  <button key={key} className="col btn btn-warning me-1">
                    <i className="col bi bi-file-earmark"></i> {val.nombre}
                    <p className="card-text">
                      <i className="bi bi-person"></i>
                      {val.alumno}
                    </p>
                  </button>
                );
              })}
            </div>
          );
        } else {
          setEstado(
            <span className="alert alert-danger card-text">
              Los alumnos no han entregado ningun archivo
            </span>
          );
        }
        break;
      case "Estudiante":
        const archivoEntregado = archivosEstudiantes.find(
          (archivo) => archivo.alumno === user
        );
        if (archivoEntregado === undefined) {
          setEstado(
            <div>
              <div className="alert alert-danger card-text">
                ¡Falta por Entregar!{" "}
              </div>
              <label htmlFor="archivo" className="form-label">
                Subir Archivo:
              </label>
              <input
                type="file"
                name="archivo"
                id="archivo"
                className="form-control"
                multiple
              />
            </div>
          );
        } else {
          setEstado(
            <div>
              <div className="alert alert-warning card-text">¡Entregado!</div>
              <h5 className="card-text">Tus Archivos:</h5>
              <button className="col btn btn-warning me-1">
                <i className="col bi bi-file-earmark"></i>{" "}
                {archivoEntregado.nombre}
                <p className="card-text">
                  <i className="bi bi-person"></i>
                  {archivoEntregado.alumno}
                </p>
              </button>
            </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallesActividad;
