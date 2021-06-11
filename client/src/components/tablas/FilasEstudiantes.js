import React from "react";

export const FilasEstudiantes = ({ notas }) => {
  const nombreEstudiante = notas[0].estudiante.nombre;

  return (
    <tr>
      <td>{nombreEstudiante}</td>
      {notas.map((value, key) => (
        <td key={key}>{value.calificacion}</td>
      ))}
      <td>
        {Object.values(notas).reduce(
          (t, { calificacion }) => t + calificacion,
          0
        )}
      </td>
    </tr>
  );
};
