import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function FormaMateria() {
  let { id } = useParams();
  let history = useHistory();

  const [errors, setErrors] = useState([]);

  const [materia, setMateria] = useState({
    nombre: "",
    descripcion: "",
    seccion: "",
    profesor: "",
  });

  const [profesores, setProfesores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let response = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/profesores`
      );
      setProfesores(response.data);
    }
    fetchData();
  }, []);

  const agregarMateria = async (materia) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/materias/crear`,
        materia
      );
      if (response.status === 200) {
        alert(`Materia Agregada`);
        history.push("/materias/leer");
      } else {
        setErrors(response.data.errors.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          let response = await Axios.get(
            `${process.env.REACT_APP_SERVER_URL}/materias/crear/${id}`
          );
          setMateria(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const actualizarMateria = async (materia) => {
    try {
      let response = await Axios.put(
        `${process.env.REACT_APP_SERVER_URL}/materias/crear/${id}`,
        materia
      );
      if (response.status === 200) {
        alert("Materia actualizado!");
        history.push("/materias/leer");
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="formaMateria">
      <h1>Agregar Materia</h1>
      <div className="formaInput">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          onChange={(event) => {
            setMateria({ ...materia, nombre: event.target.value });
          }}
          value={materia.nombre}
        />
        {errors.length > 0 && (
          <ul className="error-list">
            {errors
              .filter((error) => error.param === "nombre")
              .map((error, key) => {
                return (
                  <li key={key} className="error-msg">
                    {error.msg}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      <div className="formaInput">
        <label htmlFor="descripcion">Descripcion:</label>
        <textarea
          name="descripcion"
          id="descripcion"
          cols="30"
          rows="10"
          onChange={(event) => {
            setMateria({ ...materia, descripcion: event.target.value });
          }}
          value={materia.descripcion}
        ></textarea>
        {errors.length > 0 && (
          <ul className="error-list">
            {errors
              .filter((error) => error.param === "descripcion")
              .map((error, key) => {
                return (
                  <li key={key} className="error-msg">
                    {error.msg}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      <div className="formaInput">
        <label htmlFor="seccion">Seccion:</label>
        <input
          type="text"
          id="seccion"
          name="seccion"
          onChange={(event) => {
            setMateria({ ...materia, seccion: event.target.value });
          }}
          value={materia.seccion}
        />
        {errors.length > 0 && (
          <ul className="error-list">
            {errors
              .filter((error) => error.param === "seccion")
              .map((error, key) => {
                return (
                  <li key={key} className="error-msg">
                    {error.msg}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      <div>
        <select
          name="profesor"
          id="profesor"
          value={materia.profesor}
          onChange={(event) => {
            setMateria({ ...materia, profesor: event.target.value });
          }}
        >
          <option value="">-- Seleccione un Profesor --</option>
          {profesores.map((profesor) => {
            return (
              <option key={profesor._id} value={profesor._id}>
                {profesor.apellido}, {profesor.nombre}
              </option>
            );
          })}
        </select>
        {errors.length > 0 && (
          <ul className="error-list">
            {errors
              .filter((error) => error.param === "profesor")
              .map((error, key) => {
                return (
                  <li key={key} className="error-msg">
                    {error.msg}
                  </li>
                );
              })}
          </ul>
        )}
        <br />
        <button
          onClick={() => {
            if (id === undefined) {
              agregarMateria(materia);
            } else {
              actualizarMateria(materia);
            }
          }}
        >
          Enviar Materia
        </button>
      </div>

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

export default FormaMateria;
