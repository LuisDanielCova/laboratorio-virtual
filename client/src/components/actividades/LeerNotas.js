import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Routes";
import NotasEstudiantes from "./NotasEstudiantes";
import Sidebar from "../complements/Sidebar";
import axios from "axios";

function LeerNotas() {
  const { usuario } = useContext(UserContext);
  const [notasEstudiantes, setNotasEstudiantes] = useState([]);
  const [headerOne, setHeaderOne] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const conseguirNotas = async () => {
      setCargando(true);
      if (usuario.cargo === "Administrador") {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/notas/`
        );
        setNotasEstudiantes(response.data.lista_notas);
      }
      if (usuario.cargo === "Profesor") {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/notas/profesor/${usuario.id}`
        );
        setNotasEstudiantes(response.data.lista_notas);
      } else if (usuario.cargo === "Estudiante") {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/notas/estudiante/${usuario.id}`
        );
        setNotasEstudiantes(response.data.lista_notas);
      }
      setCargando(false);
    };
    conseguirNotas();
  }, [usuario]);

  useEffect(() => {
    switch (usuario.cargo) {
      case "Administrador":
        setHeaderOne(<h1 className="display-2">Notas</h1>);
        setParagraph(
          <p className="lead">
            Aqui podras ver las notas de todos los estudiantes
          </p>
        );
        break;
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
        setHeaderOne(<h1 className="display-2">Notas</h1>);
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
  }, [usuario]);

  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col m-3">
          {headerOne}
          {paragraph}
          <div>
            <NotasEstudiantes notas={notasEstudiantes} cargando={cargando} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeerNotas;
