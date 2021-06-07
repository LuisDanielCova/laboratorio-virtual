import React from "react";
import Navbar from "../complements/Navbar";
import Footer from "../complements/Footer";

function RegistroUsuario() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card p-5 m-5 mx-auto">
          <h3 className="fw-bold col-md-12">Registro de Usuario</h3>
          <form action="">
            <div className="container-fluid ps-0 my-3 row">
              <div className="col-lg-1">
                <label htmlFor="cedula" className="form-label mt-2">
                  Cedula:
                </label>
              </div>
              <div className="col-lg-11">
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  placeholder="Ejemplo: 25416008"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="container-fluid ps-0 my-3 row">
              <div className="col-xl-1">
                <label htmlFor="nombre" className="form-label mt-2">
                  Nombre:
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ejemplo: Luis"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-lg-1">
                <label htmlFor="apellido" className="form-label mt-2">
                  Apellido:
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Ejemplo: Cova"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="container-fluid ps-0 my-3 row">
              <div className="col-lg-3">
                <label htmlFor="fecha-nac" className="form-label mt-2 me-0">
                  Fecha de Nacimiento:
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="date"
                  id="fecha-nac"
                  name="fecha-nac"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-lg-1">
                <label htmlFor="telefono" className="form-label mt-2">
                  Telefono:
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="Ejemplo: 04169861942"
                  className="form-control"
                />
              </div>
            </div>
            <div className="container-fluid ps-0 my-3 row">
              <div className="col-lg-1">
                <label htmlFor="correo" className="form-label mt-2">
                  Correo:
                </label>
              </div>
              <div className="col-md-11">
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  placeholder="Ejemplo: ldcn96@gmail.com"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="container-fluid ps-0 my-3 row">
              <div className="col-lg-1">
                <label htmlFor="usuario" className="form-label mt-2">
                  Usuario:
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  id="usuario"
                  name="usuario"
                  placeholder="Ejemplo: LuisCova"
                  className="form-control"
                  required
                />
              </div>
              <div className="col-lg-2">
                <label htmlFor="contrasena" className="form-label mt-2">
                  Contraseña:
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  id="contrasena"
                  name="contrasena"
                  placeholder="8 caracteres minimo"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <button className="btn btn-warning">Registrarse</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegistroUsuario;
