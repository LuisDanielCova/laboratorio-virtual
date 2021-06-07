import React from "react";
import TarjetasActividades from "./cards/TarjetasActividades";

function DetallesMateria() {
  const materia = {
    nombre: "Programacion 3",
    descripcion:
      "En esta materia se vera la programacion modular y la programacion orientada a objetos.",
    seccion: "T1",
    profesor: { nombre: "Luis Cova", correo: "Ldcn96@gmail.com" },
    alumnos: ["", "", "", "", ""],
  };

  const actividad = {
    nombre: "Arreglos - Parte 1",
    descripcion:
      "Invertir los numeros dentro de un arreglo o algo asi idk, c++ y vaina",
    fecha_entrega: new Date().toISOString().slice(0, 10),
    nota: 20,
  };

  return (
    <div className="col m-3">
      <div className="card py-3 shadow-lg">
        <h3 className="fw-bold col-md-12 text-center">{materia.nombre}</h3>
        <div className="row m-3">
          <div className="col-lg-8 my-2">
            <div className="card p-2">
              <p className="card-text">
                <strong>Descripcion:</strong> {materia.descripcion}
              </p>
              <h4 className="fw-bold card-text">
                <i className="bi bi-clipboard-check"></i> Actividades:
              </h4>
              <div className="row">
                <TarjetasActividades actividad={actividad} />
                <TarjetasActividades actividad={actividad} />
              </div>
            </div>
          </div>
          <div className="col-lg-4 my-2">
            <div className="card p-2">
              <div className="card p-2">
                <h5 className="fw-bold card-text">
                  <i className="bi bi-person-badge"></i> Profesor:
                </h5>
                <p className="card-text">
                  <i className="bi bi-eyeglasses"></i> {materia.profesor.nombre}{" "}
                  - {materia.profesor.correo}
                </p>
              </div>
              <div className="card p-2 my-1">
                <h5 className="fw-bold card-text">
                  <i className="bi bi-people"></i> Alumnos:
                </h5>
                <p className="card-text">
                  <i className="bi bi-person"></i> Pito Perez -
                  pitoperez@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallesMateria;
