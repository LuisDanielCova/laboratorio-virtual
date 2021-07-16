import React, { useState, useEffect } from "react";
// import { TablaNotasEstudiantes } from "../tablas/TablaNotasEstudiantes";
import { TablaNotasProfesores } from "../tablas/TablaNotasProfesores";

function NotasEstudiantes({ notas, cargando }) {
  const [notasOrdenadas, setNotasOrdenadas] = useState([]);
  const [tablas, setTablas] = useState([]);
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

  useEffect(() => {
    if (notasSeparadas !== undefined) {
      if (notasSeparadas.length > 0) {
        notasSeparadas.map((notas, key) =>
          setTablas((tablaAnterior) => [
            ...tablaAnterior,
            <TablaNotasProfesores notas={notas} key={key} />,
          ])
        );
      } else {
        setTablas(
          <p className="lead">Actualmente no hay notas en el sistema</p>
        );
      }
    }
  }, [notasSeparadas]);

  if (cargando) {
    return (
      <div className="d-flex row justify-content-center my-3">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <strong className="text-center text-warning">Cargando...</strong>
      </div>
    );
  }

  return <div>{tablas}</div>;
}

export default NotasEstudiantes;
