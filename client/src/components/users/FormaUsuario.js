import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function FormaUsuario() {
  let { id } = useParams();
  let history = useHistory();

  const [errors, setErrors] = useState([]);

  const [usuario, setUsuario] = useState({
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

  const agregarUsuario = async (usuario) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/crear`,
        usuario
      );
      if (response.status === 200) {
        alert("Usuario agregado!");
        history.push("/usuarios/");
      } else {
        setErrors(response.data.errors_array.errors);
        console.log(errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actualizarUsuario = async (usuario) => {
    try {
      let response = await Axios.put(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/actualizar/${id}`,
        usuario
      );
      if (response.status === 200) {
        alert("Usuario actualizado!");
        history.push("/usuarios/");
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
        `${process.env.REACT_APP_SERVER_URL}/usuarios/actualizar/${id}`
      ).then((response) => {
        setUsuario({ ...response.data, contrasena: "" });
      });
    }
  }, [id]);

  return (
    <div className="container">
      <h1>Agregar Usuario</h1>
      <label htmlFor="cedula">Cedula:</label>
      <input
        type="text"
        id="cedula"
        name="cedula"
        onChange={(event) => {
          setUsuario({ ...usuario, cedula: event.target.value });
        }}
        value={usuario.cedula}
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
          setUsuario({ ...usuario, nombre: event.target.value });
        }}
        value={usuario.nombre}
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
          setUsuario({ ...usuario, apellido: event.target.value });
        }}
        value={usuario.apellido}
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
          setUsuario({
            ...usuario,
            fecha_nac: event.target.value,
          });
        }}
        value={usuario.fecha_nac.slice(0, 10)}
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
          setUsuario({ ...usuario, telefono: event.target.value });
        }}
        value={usuario.telefono}
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
          setUsuario({ ...usuario, correo: event.target.value });
        }}
        value={usuario.correo}
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
          setUsuario({ ...usuario, usuario: event.target.value });
        }}
        value={usuario.usuario}
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
        value={usuario.contrasena}
        onChange={(event) => {
          setUsuario({ ...usuario, contrasena: event.target.value });
        }}
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
      <select
        name="cargo"
        id="cargo"
        value={usuario.cargo}
        onChange={(event) => {
          setUsuario({ ...usuario, cargo: event.target.value });
        }}
      >
        <option value="">-- Seleccione un Cargo --</option>
        <option value="Estudiante">Estudiante</option>
        <option value="Profesor">Profesor</option>
        <option value="Coordinador">Coordinador</option>
      </select>
      {errors.length > 0 && (
        <ul className="error-list">
          {errors
            .filter((error) => error.param === "cargo")
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
        className="btn btn-primary"
        onClick={() => {
          if (id === undefined) {
            agregarUsuario(usuario);
          } else {
            actualizarUsuario(usuario);
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
          <a href="/usuarios/crear">Forma</a>
        </li>
        <li>
          <a href="/usuarios/">Leer</a>
        </li>
      </ul>
    </div>
  );
}

export default FormaUsuario;
