import React, { useState, useEffect } from "react";
import { FilasEstudiantes } from "./FilasEstudiantes";

export const TablaNotasProfesores = ({ notas }) => {
  const nombreMateria = notas[0].actividad.materia.nombre;

  const [nombres] = useState(notas.map((nota) => nota.estudiante.nombre));
  const actividades = notas.map((nota) => nota.actividad.nombre);

  const [estudiantesSeparados, setEstudiantesSeparados] = useState([]);
  const [actividadesSeparadas] = useState(new Set([...actividades]));
  const [tr, setTr] = useState("");
  const [th, setTh] = useState("");

  useEffect(() => {
    const nombresSeparados = new Set([...nombres]);
    const separarEstudiantes = (nombreEstudiante) => {
      setEstudiantesSeparados((notasAnteriores) => [
        ...notasAnteriores,
        notas.filter((nota) => {
          return nota.estudiante.nombre === nombreEstudiante;
        }),
      ]);
    };

    if (nombresSeparados.size > 0) {
      nombresSeparados.forEach(separarEstudiantes);
    }
  }, [notas, nombres]);

  useEffect(() => {
    if (estudiantesSeparados.length > 0) {
      estudiantesSeparados.map((value, key) => {
        return setTr((trAnterior) => [
          ...trAnterior,
          <FilasEstudiantes notas={value} key={key} />,
        ]);
      });
    }
  }, [estudiantesSeparados]);

  useEffect(() => {
    const functionLoca = (lmao, key) => {
      setTh((thAnterior) => [...thAnterior, <th key={key}>{lmao}</th>]);
    };

    if (actividadesSeparadas.size > 0) {
      actividadesSeparadas.forEach(functionLoca);
    }
  }, [actividadesSeparadas]);

  return (
    <div className="table-responsive">
      <h4>{nombreMateria}</h4>
      <table className="table table-dark table-striped table-hover table-bordered table-sm">
        <thead>
          <tr>
            <th>Alumnos / Actividades</th>
            {th &&
              th.map((value) => {
                return value;
              })}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {tr &&
            tr.map((value) => {
              return value;
            })}
        </tbody>
      </table>
    </div>
  );
};
