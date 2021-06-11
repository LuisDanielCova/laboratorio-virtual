import React from "react";

export const TablaNotasEstudiantes = ({ notas }) => {
  const nombreMateria = notas[0].actividad.materia.nombre;

  return (
    <div className="table-responsive">
      <h4>{nombreMateria}</h4>
      <table className="table table-dark table-striped table-hover table-bordered table-sm">
        <thead>
          <tr>
            <th>Actividades</th>
            {notas.map((nota, key) => (
              <th key={key}>{nota.actividad.nombre}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Notas: </td>
            {notas.map((nota, key) => (
              <td key={key}>{nota.calificacion}</td>
            ))}
            <td>
              {Object.values(notas).reduce(
                (t, { calificacion }) => t + calificacion,
                0
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
