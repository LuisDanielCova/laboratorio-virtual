import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../complements/Sidebar";
import { TarjetaInscribirMateria } from "../cards/TarjetaInscribirMateria";
import { MostrarMateriasDisponibles } from "./MostrarMateriasDisponibles";

function InscribirMateria() {
  const [materias, setMaterias] = useState("");
  const [listaMaterias, setListaMaterias] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  useEffect(() => {
    const conseguirMaterias = async () => {
      setCargando(true);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/materias/`
      );
      setMaterias(response.data);
      setCargando(false);
    };

    conseguirMaterias();
  }, []);

  useEffect(() => {
    if (materias.length > 0) {
      materias.map((val, key) => {
        return setListaMaterias((materiaAnterior) => [
          ...materiaAnterior,
          <TarjetaInscribirMateria materia={val} key={key} />,
        ]);
      });
      setMensajeError("");
    } else {
      if (cargando !== true) {
        setMensajeError(
          <p className="lead">Actualmente no hay notas en el sistema</p>
        );
      } else {
        setMensajeError("");
      }
    }
    //eslint-disable-next-line
  }, [materias]);

  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col py-3">
          <h1 className="m-3">Inscribir Materias</h1>
          <p className="lead m-3">
            Aqui puedes inscribir una materia al pulsar el boton en la tarjeta
            de la materia que quieras inscribir
          </p>
          <MostrarMateriasDisponibles
            listaMaterias={listaMaterias}
            cargando={cargando}
            mensajeError={mensajeError}
          />
        </div>
      </div>
    </div>
  );
}

export default InscribirMateria;
