import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import NotasEstudiantes from "./NotasEstudiantes";
import { TablaNotasProfesores } from "../tablas/TablaNotasProfesores";

function LeerNotas() {
  const user = useContext(UserContext);
  const [notasEstudiantes, setNotasEstudiantes] = useState([]);
  const [notasProfesor, setNotasProfesor] = useState([]);
  const [headerOne, setHeaderOne] = useState("");
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    setNotasEstudiantes([
      {
        calificacion: 12,
        actividad: {
          nombre: "Arreglos - 1",
          materia: {
            nombre: "Programacion 3",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Estudiante",
        },
      },
      {
        calificacion: 15,
        actividad: {
          nombre: "Arreglos - 2",
          materia: {
            nombre: "Programacion 3",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Estudiante",
        },
      },
      {
        calificacion: 20,
        actividad: {
          nombre: "Listas - 1",
          materia: {
            nombre: "Programacion 3",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Estudiante",
        },
      },
      {
        calificacion: 10,
        actividad: {
          nombre: "Diagramas UML - 1",
          materia: {
            nombre: "Bases de Datos",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Estudiante",
        },
      },
      {
        calificacion: 15,
        actividad: {
          nombre: "Diagramas UML - 2",
          materia: {
            nombre: "Bases de Datos",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Estudiante",
        },
      },
      {
        calificacion: 20,
        actividad: {
          nombre: "SQL - 1",
          materia: {
            nombre: "Bases de Datos",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Estudiante",
        },
      },
    ]);
  }, []);

  useEffect(() => {
    setNotasProfesor([
      {
        calificacion: 10,
        actividad: {
          nombre: "Arreglos - 1",
          materia: {
            nombre: "Programacion 3",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Estudiante",
        },
      },
      {
        calificacion: 20,
        actividad: {
          nombre: "funciones - 1",
          materia: {
            nombre: "Programacion 2",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Luis Cova",
        },
      },
      {
        calificacion: 15,
        actividad: {
          nombre: "cosas - 1",
          materia: {
            nombre: "Programacion 1",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Hector",
        },
      },
      {
        calificacion: 10,
        actividad: {
          nombre: "cosas - 1",
          materia: {
            nombre: "Programacion 1",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Victor",
        },
      },
      {
        calificacion: 12,
        actividad: {
          nombre: "cosas - 2",
          materia: {
            nombre: "Programacion 1",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Victor",
        },
      },
      {
        calificacion: 10,
        actividad: {
          nombre: "cosas - 2",
          materia: {
            nombre: "Programacion 1",
            profesor: "Profesor",
          },
        },
        estudiante: {
          nombre: "Hector",
        },
      },
    ]);
  }, []);

  useEffect(() => {
    switch (user) {
      case "Profesor":
        setHeaderOne(<h1 className="display-2">Notas</h1>);
        setParagraph(
          <p className="lead">
            Aqui podras ver todas las notas de cada uno de los alumnos de las
            materias de las cuales eres profesor.
          </p>
        );
        break;
      case "Estudiante":
        setHeaderOne(<h1 className="display-2">Inscribir Materias</h1>);
        setParagraph(
          <p className="lead">
            Aqui podras ver las notas de todas tus materias
          </p>
        );
        break;
      default:
        <p className="lead">Error, cargue la pagina nuevamente</p>;
        break;
    }
  }, [user]);

  return (
    <div className="col m-3">
      {headerOne}
      {paragraph}
      <div>
        <NotasEstudiantes notas={notasProfesor} />
      </div>
    </div>
  );
}

export default LeerNotas;
