import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function FormaAlumno() {
  let { id } = useParams();
  let history = useHistory();

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

  const agregarAlumno = (alumno) => {
    Axios.post(`${process.env.REACT_APP_SERVER_URL}/insert`, alumno).then(
      () => {
        alert("Usuario Agregado");
        history.push("/read");
      }
    );
  };

  const actualizarAlumno = (alumno) => {
    Axios.put(`${process.env.REACT_APP_SERVER_URL}/update/${id}`, alumno).then(
      () => {
        alert("Usuario Actualizado");
        history.push("/read");
      }
    );
  };

  useEffect(() => {
    if (id) {
      Axios.get(`${process.env.REACT_APP_SERVER_URL}/update/${id}`).then(
        (response) => {
          setAlumno(response.data);
        }
      );
    }
  }, []);
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
    </div>
  );
}

export default FormaAlumno;
