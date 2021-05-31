import React from "react";

function App() {
  return (
    <div className="App">
      <h1>Pruebas a la base de datos</h1>
      <h2>Alumnos</h2>
      <ul>
        <li>
          <a href="/forma/alumno">Forma</a>
        </li>
        <li>
          <a href="/read/alumnos">Leer</a>
        </li>
      </ul>
      <h2>Profesores</h2>
      <ul>
        <li>
          <a href="/forma/profesor">Forma</a>
        </li>
        <li>
          <a href="/read/profesores">Leer</a>
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
    </div>
  );
}

export default App;
