import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function FormaActividad() {
  const history = useHistory();

  let { id } = useParams();
  const [errors, setErrors] = useState([]);

  const [materias, setMaterias] = useState([]);

  const [actividad, setActividad] = useState({
    nombre: "",
    descripcion: "",
    fecha_entrega: "",
    nota: 0,
    materia: "",
  });

  useEffect(() => {
    async function fetchData() {
      let response = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/materias/`
      );
      if (response.status === 200) {
        setMaterias(response.data.lista_materias);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (id) {
      Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/materias/actividades/crear/${id}`
      ).then((response) => {
        setActividad(response.data.results);
      });
    }
  }, [id]);

  const agregarActividad = async (actividad) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/materias/actividades/crear`,
        actividad
      );
      if (response.status === 200) {
        alert(`Actividad Agregada`);
        history.push("/actividades/leer");
      } else {
        setErrors(response.data.errors.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actualizarActividad = async (actividad) => {
    try {
      let response = await Axios.put(
        `${process.env.REACT_APP_SERVER_URL}/materias/actividades/crear/${id}`,
        actividad
      );
      if (response.status === 200) {
        alert(`Actividad Actualizada`);
        history.push("/actividades/leer");
      } else {
        setErrors(response.data.errors.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="forma">
      <h1>Agregar Actividad</h1>
      <div>
        <div className="formaInput">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            onChange={(event) => {
              setActividad({ ...actividad, nombre: event.target.value });
            }}
            value={actividad.nombre}
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
              setActividad({ ...actividad, descripcion: event.target.value });
            }}
            value={actividad.descripcion}
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
          <label htmlFor="fecha-nac">Fecha de Entrega:</label>
          <input
            type="date"
            name="fecha-nac"
            id="fecha-nac"
            onChange={(event) => {
              setActividad({
                ...actividad,
                fecha_entrega: event.target.value,
              });
            }}
            value={actividad.fecha_entrega.slice(0, 10)}
          />
          {errors.length > 0 && (
            <ul className="error-list">
              {errors
                .filter((error) => error.param === "fecha_entrega")
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
          <label htmlFor="nota">Nota:</label>
          <input
            type="number"
            name="nota"
            id="nota"
            onChange={(event) => {
              setActividad({ ...actividad, nota: event.target.value });
            }}
            value={actividad.nota}
          />
          {errors.length > 0 && (
            <ul className="error-list">
              {errors
                .filter((error) => error.param === "nota")
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
          <select
            name="profesor"
            id="profesor"
            value={actividad.materia}
            onChange={(event) => {
              setActividad({ ...actividad, materia: event.target.value });
            }}
          >
            <option value="">-- Seleccione una Materia --</option>
            {materias.map((materia) => {
              return (
                <option key={materia._id} value={materia._id}>
                  {materia.nombre}
                </option>
              );
            })}
          </select>
          {errors.length > 0 && (
            <ul className="error-list">
              {errors
                .filter((error) => error.param === "materia")
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
        <button
          onClick={() => {
            if (id === undefined) {
              agregarActividad(actividad);
            } else {
              actualizarActividad(actividad);
            }
          }}
        >
          Enviar Actividad
        </button>
      </div>
      <div></div>
    </div>
  );
}

export default FormaActividad;
