import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import TarjetasMaterias from "../cards/TarjetasMaterias";
import Sidebar from "../complements/Sidebar";
import { UserContext } from "../../Routes";
import { withRouter } from "react-router-dom";

function LeerMaterias() {
  const { usuario } = useContext(UserContext);
  const [materias, setMaterias] = useState([]);
  const [listaMaterias, setListaMaterias] = useState([]);
  const [headerOne, setHeaderOne] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const conseguirMaterias = async (usuario) => {
      setCargando(true);
      switch (usuario.cargo) {
        case "Administrador":
          const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/materias/`
          );
          setMaterias(response.data);
          break;
        case "Profesor":
          const response2 = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/materias/profesor/${usuario.id}`
          );
          setMaterias(response2.data.materias);
          break;
        case "Estudiante":
          const response3 = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/materias/estudiante/${usuario.id}`
          );
          setMaterias(response3.data.materias);
          break;
        default:
          break;
      }
      setCargando(false);
    };

    conseguirMaterias(usuario);
  }, [usuario]);

  useEffect(() => {
    if (materias !== undefined) {
      if (materias.length > 0) {
        materias.map((val, key) => {
          return setListaMaterias((materiaAnterior) => [
            ...materiaAnterior,
            <TarjetasMaterias materia={val} key={key} />,
          ]);
        });
        setMensajeError("");
      } else {
        setMensajeError(
          <p className="lead">Actualmente no hay materias en el sistema</p>
        );
      }
    }
  }, [materias]);

  useEffect(() => {
    switch (usuario.cargo) {
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
        setHeaderOne(<h1 className="m-3">Lista de Materias</h1>);
        setParagraph(
          <p className="lead m-3">
            Aqui puedes ver tus materias inscritas, haz click en el boton de
            detalles para dirigirte a la pagina de detalles de la materia
          </p>
        );
        break;
      default:
        <p className="lead m-3">Error, cargue la pagina nuevamente</p>;
        break;
    }
  }, [usuario]);

  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col py-3">
          {headerOne}
          {paragraph}
          {cargando && (
            <div className="d-flex row justify-content-center my-3">
              <div className="spinner-border text-warning" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <strong className="text-center text-warning">Cargando...</strong>
            </div>
          )}
          <div className="row m-2">{listaMaterias && listaMaterias}</div>
          <div className="container ms-3">{mensajeError}</div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LeerMaterias);
