import React, { useState, useEffect, useContext } from "react";
import TarjetasMaterias from "./cards/TarjetasMaterias";
import { UserContext } from "../../App";

function LeerMaterias() {
  const user = useContext(UserContext);
  const [materias, setMaterias] = useState([]);
  const [headerOne, setHeaderOne] = useState("");
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    setMaterias([
      {
        nombre: "Programacion 3",
        descripcion:
          "En esta materia se vera la programacion modular y la programacion orientada a objetos.",
        seccion: "T1",
        profesor: "Luis Cova",
        alumnos: ["", "", "", "", ""],
      },
      {
        nombre: "Bases de Datos",
        descripcion:
          "En esta materia se vera la creacion de diagramas UML, tablas y programacion SQL para bases de datos",
        seccion: "T2",
        profesor: "Tu primo que odias",
        alumnos: ["", "", "", "", "", "", "", ""],
      },
      {
        nombre: "Estructura de datos",
        descripcion:
          "Aqui vas a valer vergas porque se ven arboles y webonadas locas asi, y eso no es de dios, y el profesor es malando csm",
        seccion: "T1",
        profesor: "El Brayam",
        alumnos: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    switch (user) {
      case "Administrador":
        setHeaderOne(<h1 className="m-3">Administrar Materias</h1>);
        setParagraph(
          <p className="lead m-3">
            Aqui podras ver todas las materias en el sistema, actualizarlas o
            eliminarlas
          </p>
        );
        break;
      case "Profesor":
        setHeaderOne(<h1 className="m-3">Tus Materias</h1>);
        setParagraph(
          <p className="lead m-3">
            Aqui podras ver todas las materias de las cuales eres profesor. Al
            pulsar el boton en la materia respectiva, iras a la pagina de ella.
          </p>
        );
        break;
      case "Estudiante":
        setHeaderOne(<h1 className="m-3">Inscribir Materias</h1>);
        setParagraph(
          <p className="lead m-3">
            Inscribe las materias al presionar el boton en sus respectivas
            tarjetas
          </p>
        );
        break;
      default:
        <p className="lead m-3">Error, cargue la pagina nuevamente</p>;
        break;
    }
  }, [user]);

  return (
    <div className="col py-3">
      {headerOne}
      {paragraph}
      <div className="row m-2">
        {materias &&
          materias.map((val, key) => {
            return <TarjetasMaterias materia={val} />;
          })}
      </div>
    </div>
  );
}

export default LeerMaterias;
