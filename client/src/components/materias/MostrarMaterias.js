import React from "react";

export const MostrarMaterias = ({ cargando, listaMaterias, mensajeError }) => {
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

  return (
    <div>
      <div className="row m-2">{listaMaterias && listaMaterias}</div>
      <div className="container ms-3">{mensajeError}</div>
    </div>
  );
};
