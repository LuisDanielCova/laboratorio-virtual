import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import FormError from "./errors/FormError";

function FormaAlumno() {
  let { id } = useParams();
  let history = useHistory();

  const [errors, setErrors] = useState([]);

  const [alumno, setAlumno] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    fecha_nac: "",
    telefono: "",
    correo: "",
    usuario: "",
    contrasena: "",
  });

  const agregarAlumno = async (alumno) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/alumno/crear`,
        alumno
      );
      if (response.data.statusCode === 200) {
        alert("Usuario agregado!");
        history.push("/read/alumnos");
      } else {
        setErrors(response.data.errors_array.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actualizarAlumno = async (alumno) => {
    try {
      let response = await Axios.put(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/alumno/actualizar/${id}`,
        alumno
      );
      if (response.data.statusCode === 200) {
        alert("Usuario actualizado!");
        history.push("/read/alumnos");
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
        `${process.env.REACT_APP_SERVER_URL}/usuarios/alumno/actualizar/${id}`
      ).then((response) => {
        setAlumno(response.data);
      });
    }
  }, [id]);

  useEffect(() => {}, [errors]);

  return (
    <div className="formaAlumnos">
      <h1>Agregar Alumno</h1>
      <label htmlFor="cedula">Cedula:</label>
      <input
        type="text"
        id="cedula"
        name="cedula"
        onChange={(event) => {
          setAlumno({ ...alumno, cedula: event.target.value });
        }}
        value={alumno.cedula}
      />
      <FormError errors={errors} campo={"cedula"} />
      <label htmlFor="nombre">Nombre:</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        onChange={(event) => {
          setAlumno({ ...alumno, nombre: event.target.value });
        }}
        value={alumno.nombre}
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
          setAlumno({ ...alumno, apellido: event.target.value });
        }}
        value={alumno.apellido}
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
          setAlumno({
            ...alumno,
            fecha_nac: event.target.value,
          });
        }}
        value={alumno.fecha_nac.slice(0, 10)}
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
          setAlumno({ ...alumno, telefono: event.target.value });
        }}
        value={alumno.telefono}
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
          setAlumno({ ...alumno, correo: event.target.value });
        }}
        value={alumno.correo}
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
          setAlumno({ ...alumno, usuario: event.target.value });
        }}
        value={alumno.usuario}
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
          setAlumno({ ...alumno, contrasena: event.target.value });
        }}
        value={alumno.contrasena}
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
            agregarAlumno(alumno);
          } else {
            actualizarAlumno(alumno);
          }
        }}
      >
        Agregar
      </button>
      <ul>
        <li>
          <a href="/">Pagina Principal</a>
        </li>
        <li>
          <a href="/forma/alumno">Forma</a>
        </li>
        <li>
          <a href="/read/alumnos">Leer</a>
        </li>
      </ul>
    </div>
  );
}

export default FormaAlumno;
