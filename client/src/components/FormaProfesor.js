import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function FormaProfesor() {
  let { id } = useParams();
  let history = useHistory();

  const [errors, setErrors] = useState([]);

  const [profesor, setProfesor] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    fecha_nac: "",
    telefono: "",
    correo: "",
    usuario: "",
    contrasena: "",
    cargo: "",
  });

  const agregarProfesor = async (profesor) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/profesor/crear`,
        profesor
      );
      if (response.data.statusCode === 200) {
        alert("Usuario agregado!");
        history.push("/read");
      } else {
        setErrors(response.data.errors_array.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actualizarProfesor = async (profesor) => {
    try {
      let response = await Axios.put(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/profesor/actualizar/${id}`,
        profesor
      );
      if (response.data.statusCode === 200) {
        alert("Usuario actualizado!");
        history.push("/read");
      } else {
        setErrors(response.data.errors_array.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (id) {
      Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/profesor/actualizar/${id}`
      ).then((response) => {
        setProfesor(response.data);
      });
    }
  }, [id]);

  useEffect(() => {}, [errors]);

  return (
    <div className="formaProfesor">
      <h1>Agregar Profesor</h1>
      <label htmlFor="cedula">Cedula:</label>
      <input
        type="text"
        id="cedula"
        name="cedula"
        onChange={(event) => {
          setProfesor({ ...profesor, cedula: event.target.value });
        }}
        value={profesor.cedula}
      />
      {errors.length > 0 && (
        <ul className="error-list">
          {errors
            .filter((error) => error.param === "cedula")
            .map((error, key) => {
              return (
                <li key={key} className="error-msg">
                  {error.msg}
                </li>
              );
            })}
        </ul>
      )}
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        onChange={(event) => {
          setProfesor({ ...profesor, nombre: event.target.value });
        }}
        value={profesor.nombre}
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
      <label htmlFor="apellido">Apellido:</label>
      <input
        type="text"
        id="apellido"
        name="apellido"
        onChange={(event) => {
          setProfesor({ ...profesor, apellido: event.target.value });
        }}
        value={profesor.apellido}
      />
      {errors.length > 0 && (
        <ul className="error-list">
          {errors
            .filter((error) => error.param === "apellido")
            .map((error, key) => {
              return (
                <li key={key} className="error-msg">
                  {error.msg}
                </li>
              );
            })}
        </ul>
      )}
      <label htmlFor="fecha-nac">Fecha de Nacimiento:</label>
      <input
        type="date"
        name="fecha-nac"
        id="fecha-nac"
        onChange={(event) => {
          setProfesor({
            ...profesor,
            fecha_nac: event.target.value,
          });
        }}
        value={profesor.fecha_nac.slice(0, 10)}
      />
      {errors.length > 0 && (
        <ul className="error-list">
          {errors
            .filter((error) => error.param === "fecha_nac")
            .map((error, key) => {
              return (
                <li key={key} className="error-msg">
                  {error.msg}
                </li>
              );
            })}
        </ul>
      )}
      <label htmlFor="telefono">Telefono:</label>
      <input
        type="text"
        id="telefono"
        name="telefono"
        onChange={(event) => {
          setProfesor({ ...profesor, telefono: event.target.value });
        }}
        value={profesor.telefono}
      />
      {errors.length > 0 && (
        <ul className="error-list">
          {errors
            .filter((error) => error.param === "telefono")
            .map((error, key) => {
              return (
                <li key={key} className="error-msg">
                  {error.msg}
                </li>
              );
            })}
        </ul>
      )}
      <label htmlFor="correo">Correo:</label>
      <input
        type="email"
        name="correo"
        id="correo"
        onChange={(event) => {
          setProfesor({ ...profesor, correo: event.target.value });
        }}
        value={profesor.correo}
      />
      {errors.length > 0 && (
        <ul className="error-list">
          {errors
            .filter((error) => error.param === "correo")
            .map((error, key) => {
              return (
                <li key={key} className="error-msg">
                  {error.msg}
                </li>
              );
            })}
        </ul>
      )}
      <label htmlFor="usuario">Usuario:</label>
      <input
        type="text"
        id="usuario"
        name="usuario"
        onChange={(event) => {
          setProfesor({ ...profesor, usuario: event.target.value });
        }}
        value={profesor.usuario}
      />
      {errors.length > 0 && (
        <ul className="error-list">
          {errors
            .filter((error) => error.param === "usuario")
            .map((error, key) => {
              return (
                <li key={key} className="error-msg">
                  {error.msg}
                </li>
              );
            })}
        </ul>
      )}
      <label htmlFor="contrasena">Contraseña:</label>
      <input
        type="password"
        name="contrasena"
        id="contrasena"
        onChange={(event) => {
          setProfesor({ ...profesor, contrasena: event.target.value });
        }}
        value={profesor.contrasena}
      />
      {errors.length > 0 && (
        <ul className="error-list">
          {errors
            .filter((error) => error.param === "contrasena")
            .map((error, key) => {
              return (
                <li key={key} className="error-msg">
                  {error.msg}
                </li>
              );
            })}
        </ul>
      )}
      <button
        onClick={() => {
          if (id === undefined) {
            agregarProfesor(profesor);
          } else {
            actualizarProfesor(profesor);
          }
        }}
      >
        Agregar
      </button>
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

export default FormaProfesor;
