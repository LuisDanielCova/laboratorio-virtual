import React from "react";

function DetallesUsuario() {
  const usuario = {
    cedula: "25416008",
    nombre: "Luis",
    apellido: "Cova",
    fechaNac: new Date().toISOString().slice(0, 10),
    telefono: "04169861942",
    correo: "ldcn96@gmail.com",
    usuario: "LuisCova",
    cargo: "Estudiante",
  };

  return (
    <div className="col m-3">
      <div className="card py-3 shadow-lg">
        <h3 className="fw-bold col-md-12 text-center">Detalles del Usuario</h3>
        <div className="row m-3">
          <div className="col-lg-8 my-2">
            <div className="card p-4">
              <h4 className="fw-bold card-text">Detalles Personales:</h4>
              <div className="py-2">
                <p className="card-text">
                  <i className="bi bi-person"></i>{" "}
                  <strong>Nombre Completo:</strong> {usuario.nombre}{" "}
                  {usuario.apellido}
                </p>
                <p className="card-text">
                  <i className="bi bi-card-text"></i> <strong>Cedula:</strong>{" "}
                  {usuario.cedula}
                </p>
                <p className="card-text">
                  <i className="bi bi-calendar3"></i>{" "}
                  <strong>Fecha de Nacimiento:</strong> {usuario.fechaNac}
                </p>
                <p className="card-text">
                  <i className="bi bi-telephone"></i> <strong>Telefono:</strong>{" "}
                  {usuario.telefono}
                </p>
                <p className="card-text">
                  <i className="bi bi-envelope"></i> <strong>Correo:</strong>{" "}
                  {usuario.correo}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 my-2">
            <div className="card p-2">
              <div className="card p-2">
                <h4 className="fw-bold">Detalles de Usuario:</h4>
                <p className="card-text">
                  <i className="bi bi-person-badge"></i>{" "}
                  <strong>Nombre de Usuario:</strong> {usuario.usuario}
                </p>
                <p className="card-text">
                  <strong>
                    <i className="bi bi-person-circle"></i> Cargo:
                  </strong>{" "}
                  {usuario.cargo}
                </p>
              </div>
              <div className="card px-3 py-2 mt-1">
                <h4 className="fw-bold">Acciones:</h4>
                <button className="btn btn-warning">
                  <i className="bi bi-pencil"></i> Editar
                </button>
                <button className="btn btn-danger mt-1">
                  <i className="bi bi-dash-circle"></i> Borrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallesUsuario;
