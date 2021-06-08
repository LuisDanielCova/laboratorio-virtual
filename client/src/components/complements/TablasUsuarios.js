import React from "react";

const TablasUsuarios = ({ usuarios, cargando }) => {
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
    <div className="table-responsive">
      <table className="table table-dark table-striped table-hover table-bordered table-sm">
        <thead>
          <tr>
            <th scope="col">Cedula</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Correo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((val, key) => {
            return (
              <tr key={key}>
                <th scope="row">{val.albumId}</th>
                <td>{val.id}</td>
                <td>{val.title}</td>
                <td>{val.url}</td>
                <td colSpan="3" className="p-0">
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" className="btn btn-warning rounded-0">
                      <i className="bi bi-person"></i> Detalles
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning border-0"
                      style={{ backgroundColor: "#F59B18" }}
                    >
                      <i className="bi bi-pencil"></i> Actualizar
                    </button>
                    <button
                      type="button"
                      className="btn text-light btn-danger border-0 rounded-0"
                      style={{ backgroundColor: "#E24E3A" }}
                    >
                      <i className="bi bi-dash-circle"></i> Borrar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablasUsuarios;
