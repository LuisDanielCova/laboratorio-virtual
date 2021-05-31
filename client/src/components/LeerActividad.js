import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function LeerActividad() {
  const [listaActividades, setListaActividades] = useState([]);

  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await Axios.get(
          `${process.env.REACT_APP_SERVER_URL}/materias/actividades`
        );
        if (response.status === 200) {
          setListaActividades(response.data.lista_actividades);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const borrarMateria = async (id) => {
    try {
      let response = await Axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/materias/actividades/borrar/${id}`
      );
      if (response.status === 200) {
        alert("Actividad borrada");
        history.go(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="alumnos">
      <h1>Lista de Materias</h1>
      {listaActividades.map((val, key) => {
        return (
          <div className="lista" key={key}>
            <h4>Nombre: </h4>
            <p>{val.nombre}</p>
            <h4> Materia: </h4>
            <p>{val.materia.nombre}</p>
            <h4> Nota: </h4>
            <p>{val.nota}</p>
            <button
              className="updatebtn"
              onClick={() => {
                history.push(`/actividades/crear/${val._id}`);
              }}
            >
              Update
            </button>
            <button
              className="deletebtn"
              onClick={() => {
                borrarMateria(val._id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <ul>
        <li>
          <a href="/">Pagina Principal</a>
        </li>
        <li>
          <a href="/materias/crear">Forma</a>
        </li>
        <li>
          <a href="/materias/leer">Leer</a>
        </li>
      </ul>
    </div>
  );
}

export default LeerActividad;
