import React from "react";
import { useHistory } from "react-router-dom";
import BorrarUsuario from "../users/BorrarUsuario";

const TablasUsuarios = ({ usuarios, cargando }) => {
  const history = useHistory();

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
            <th scope="col">Cargo</th>
            <th scope="col">Correo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((val, key) => {
            return (
              <tr key={key}>
                <th scope="row">{val.cedula.toString()}</th>
                <td>{val.nombre}</td>
                <td>{val.apellido}</td>
                <td>{val.cargo}</td>
                <td>{val.correo}</td>
                <td className="p-0">
                  <div
                    className="btn-group w-100"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-warning rounded-0"
                      onClick={() => {
                        history.push(`/usuarios/${val._id}`);
                      }}
                    >
                      <i className="bi bi-person"></i> Detalles
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning border-0"
                      style={{ backgroundColor: "#F59B18" }}
                      onClick={() => {
                        history.push(`/usuarios/crear/${val._id}`);
                      }}
                    >
                      <i className="bi bi-pencil"></i> Actualizar
                    </button>
                    <BorrarUsuario usuario={val} tabla={true} />
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
