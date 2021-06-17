import React, { useState, useEffect } from "react";
import TarjetasActividades from "../cards/TarjetasActividades";
import { useParams } from "react-router-dom";
import Sidebar from "../complements/Sidebar";
import axios from "axios";

function DetallesMateria() {
  const [materia, setMateria] = useState();
  const [actividades, setActividades] = useState();
  const [tarjetasActividades, setTarjetasActividades] = useState([]);
  const [alumnos, setAlumnos] = useState();
  const { id } = useParams();

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
        setActividades(response.data.lista_actividades);
      }
    };
    conseguirActividades();
  }, [materia, id]);

  useEffect(() => {
    if (actividades !== undefined) {
      actividades.map((val, key) => {
        return setTarjetasActividades((tarjetaAnterior) => [
          ...tarjetaAnterior,
          <TarjetasActividades actividad={val} key={key} />,
        ]);
      });
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallesMateria;
