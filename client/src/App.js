import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Navbar from "./components/complements/Navbar";

function App() {
  let history = useHistory();

  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      let response = await axios({
        method: "GET",
        withCredentials: true,
        url: "http://localhost:3001/usuarios/sesion",
      });
      setData(response.data);
      console.log(response);
    }
    fetchData();
  }, []);

  const logout = async () => {
    let response = await axios.post(`http://localhost:3001/usuarios/logout`);
    console.log(response);
    alert(`Loggind out, brother`);
    history.go(0);
  };

  return (
    <div className="">
      <Navbar />
      <h1>Pruebas a la base de datos</h1>
      <h2>Usuarios</h2>
      {data ? <h1>Bienvenido de vuelta, {data.username}</h1> : null}
      <ul>
        <li>
          <a href="/usuarios/crear">Forma</a>
        </li>
        <li>
          <a href="/usuarios/">Leer</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
        <li>
          <button onClick={logout} className="btn btn-primary">
            Logout
          </button>
        </li>
      </ul>
      <h2>Materias</h2>
      <ul>
        <li>
          <a href="/materias/crear">Forma</a>
        </li>
        <li>
          <a href="/materias/leer">Leer</a>
        </li>
      </ul>
      <h2>Actividades</h2>
      <ul>
        <li>
          <a href="/actividades/crear">Forma</a>
        </li>
        <li>
          <a href="/actividades/leer">Leer</a>
        </li>
      </ul>
    </div>
  );
}

export default App;
