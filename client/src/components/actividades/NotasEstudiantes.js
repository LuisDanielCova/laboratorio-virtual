import React, { useState, useEffect } from "react";
// import { TablaNotasEstudiantes } from "../tablas/TablaNotasEstudiantes";
import { TablaNotasProfesores } from "../tablas/TablaNotasProfesores";

function NotasEstudiantes({ notas }) {
  const [notasOrdenadas, setNotasOrdenadas] = useState([]);
  const [materiasSeparadas, setMateriasSeparadas] = useState([]);
  const [notasSeparadas, setNotasSeparadas] = useState([]);

  const OrdenarMaterias = (a, b) => {
    const materiaA = a.actividad.materia.nombre.toUpperCase();
    const materiaB = b.actividad.materia.nombre.toUpperCase();
    if (materiaA > materiaB) return 1;
    if (materiaA < materiaB) return -1;
    return 0;
  };

  useEffect(() => {
    setNotasOrdenadas(notas.sort(OrdenarMaterias));
  }, [notas]);

  useEffect(() => {
    const materias = notasOrdenadas.map(
      (notas) => notas.actividad.materia.nombre
    );
    setMateriasSeparadas(new Set([...materias]));
  }, [notasOrdenadas]);

  useEffect(() => {
    const separarMaterias = (nombreMateria) => {
      setNotasSeparadas((notasAnteriores) => [
        ...notasAnteriores,
        notasOrdenadas.filter((notas) => {
          return notas.actividad.materia.nombre === nombreMateria;
        }),
      ]);
    };

    if (materiasSeparadas.size > 0) {
      materiasSeparadas.forEach(separarMaterias);
    }
  }, [notasOrdenadas, materiasSeparadas]);

  return (
    <div>
      {notasSeparadas &&
        notasSeparadas.map((notas, key) => (
          <TablaNotasProfesores notas={notas} key={key} />
        ))}
    </div>
  );
}

export default NotasEstudiantes;
