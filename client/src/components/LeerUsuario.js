import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

function LeerUsuario() {
  const [listaUsuarios, setListaUsuarios] = useState([]);

  let history = useHistory();

  const borrarUsuario = (id) => {
    Axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/usuarios/borrar/${id}`
    ).then(() => {
      alert(`Usuario Borrado`);
      history.go(0);
    });
  };

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_SERVER_URL}/usuarios/`).then(
      (response) => {
        setListaUsuarios(response.data);
      }
    );
  }, []);

  return (
    <div className="usuarios">
      <h1>Lista de Alumnos</h1>
      {listaUsuarios.map((val, key) => {
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
                history.push(`/usuarios/crear/${val._id}`);
              }}
            >
              Update
            </button>
            <button
              className="deletebtn"
              onClick={() => {
                borrarUsuario(val._id);
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
          <a href="/usuarios/crear">Forma</a>
        </li>
        <li>
          <a href="/usuarios/">Leer</a>
        </li>
      </ul>
    </div>
  );
}

export default LeerUsuario;
