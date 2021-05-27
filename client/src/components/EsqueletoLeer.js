import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

function Read() {
  const [listaAlumnos, setListaAlumnos] = useState([]);

  let history = useHistory();

  const borrarAlumno = (id) => {
    Axios.delete(`${process.env.REACT_APP_SERVER_URL}/delete/${id}`).then(
      () => {
        alert(`Alumno Borrado`);
        history.go(0);
      }
    );
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_URL}/read`).then((response) => {
      setListaAlumnos(response.data);
    });
  }, []);

  return (
    <div className="alumnos">
      <h1>Lista de Alumnos</h1>
      {listaAlumnos.map((val, key) => {
        return (
          <div className="lista" key={key}>
            <h4>Nombre: </h4>
            <p>{val.nombre}</p>
            <h4> Cedula: </h4>
            <p>{val.cedula}</p>
            <h4> Correo: </h4>
            <p>{val.correo}</p>
            <button
              className="updatebtn"
              onClick={() => {
                history.push(`/forma/${val._id}`);
              }}
            >
              Update
            </button>
            <button
              className="deletebtn"
              onClick={() => {
                borrarAlumno(val._id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <ul>
        <li>
          <a href="/forma">Forma</a>
        </li>
        <li>
          <a href="/read">Leer</a>
        </li>
      </ul>
    </div>
  );
}

export default Read;
