import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

function LeerMateria() {
  const [listaMaterias, setListaMaterias] = useState([]);

  let history = useHistory();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await Axios.get(
          `${process.env.REACT_APP_SERVER_URL}/materias`
        );
        if (response.status === 200) {
          setListaMaterias(response.data.lista_materias);
        } else {
          console.log(`lmaodude`);
        }
      } catch (error) {
        console.log(`xdxd`);
      }
    }
    fetchData();
  }, []);

  const borrarMateria = async (id) => {
    try {
      let response = await Axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/materias/borrar/${id}`
      );
      if (response.status === 200) {
        alert("Materia borrada");
        history.go(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="alumnos">
      <h1>Lista de Materias</h1>
      {listaMaterias.map((val, key) => {
        return (
          <div className="lista" key={key}>
            <h4>Nombre: </h4>
            <p>{val.nombre}</p>
            <h4> Profesor: </h4>
            <p>{val.profesor.nombre}</p>
            <h4> Seccion: </h4>
            <p>{val.seccion}</p>
            <button
              className="updatebtn"
              onClick={() => {
                history.push(`/materias/crear/${val._id}`);
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

export default LeerMateria;
