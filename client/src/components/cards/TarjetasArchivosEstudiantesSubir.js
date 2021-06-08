import React from "react";

const TarjetasArchivosEstudiantesSubir = () => {
  return (
    <div>
      <div className="alert alert-danger card-text">¡Falta por Entregar! </div>
      <label htmlFor="archivo" className="form-label">
        Subir Archivo:
      </label>
      <input
        type="file"
        name="archivo"
        id="archivo"
        className="form-control"
        multiple
      />
      <button className="btn btn-warning mt-1">Subir</button>
    </div>
  );
};

export default TarjetasArchivosEstudiantesSubir;
