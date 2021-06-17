import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import NotasEstudiantes from "./NotasEstudiantes";
import Sidebar from "../complements/Sidebar";
import axios from "axios";

function LeerNotas() {
  const [user] = useState("Estudiante");
  //const user = useContext(UserContext);
  const [notasEstudiantes, setNotasEstudiantes] = useState([]);
  const [headerOne, setHeaderOne] = useState("");
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    const conseguirNotas = async () => {
      if (user === "Profesor") {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/notas`
        );
        setNotasEstudiantes(response.data.lista_notas);
      } else if (user === "Estudiante") {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/notas/estudiante/60ca00f313a50581eee7d3ad`
        );
        setNotasEstudiantes(response.data.lista_notas);
      }
    };
    conseguirNotas();
  }, [user]);

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
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col m-3">
          {headerOne}
          {paragraph}
          <div>
            <NotasEstudiantes notas={notasEstudiantes} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeerNotas;
