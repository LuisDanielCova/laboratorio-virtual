import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TarjetasMaterias from "../cards/TarjetasMaterias";
import Sidebar from "../complements/Sidebar";
import { UserContext } from "../../App";

function LeerMaterias() {
  const user = useContext(UserContext);
  const [materias, setMaterias] = useState([]);
  const [listaMaterias, setListaMaterias] = useState([]);
  const [headerOne, setHeaderOne] = useState("");
  const [paragraph, setParagraph] = useState("");

  useEffect(() => {
    const conseguirMaterias = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/materias/`
      );
      setMaterias(response.data);
    };

    conseguirMaterias();
  }, []);

  useEffect(() => {
    if (materias.length > 0) {
      materias.map((val, key) => {
        return setListaMaterias((materiaAnterior) => [
          ...materiaAnterior,
          <TarjetasMaterias materia={val} key={key} />,
        ]);
      });
    }
  }, [materias]);

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
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col py-3">
          {headerOne}
          {paragraph}
          <div className="row m-2">{listaMaterias && listaMaterias}</div>
        </div>
      </div>
    </div>
  );
}

export default LeerMaterias;
