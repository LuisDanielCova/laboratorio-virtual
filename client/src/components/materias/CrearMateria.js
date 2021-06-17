import React from "react";
import Sidebar from "../complements/Sidebar";

function CrearMateria() {
  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col mx-3 py-3 px-3 my-auto">
          <div className="card py-3">
            <h3 className="fw-bold col-md-12 text-center">
              Agregar una Materia
            </h3>
            <form action="">
              <div className="container-fluid my-3 row">
                <div className="container-fluid my-3 row pe-0">
                  <div className="col-2">
                    <label htmlFor="nombre" className="form-label mt-2">
                      Nombre:
                    </label>
                  </div>
                  <div className="col-md-10">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Ejemplo: Programacion 3"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="container-fluid my-3 row pe-0">
                  <div className="col-lg-2">
                    <label htmlFor="descripcion" className="form-label mt-2">
                      Descripcion:
                    </label>
                  </div>
                  <div className="col-lg-10">
                    <textarea
                      name="descripcion"
                      id="descripcion"
                      rows="3"
                      className="form-control"
                      placeholder="Ingrese aqui la descripcion de la materia"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="container-fluid my-3 row pe-0">
                  <div className="col-lg-2">
                    <label htmlFor="seccion" className="form-label mt-2 me-0">
                      Seccion:
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      id="seccion"
                      name="seccion"
                      className="form-control"
                      placeholder="Ejemplo: T1"
                      required
                    />
                  </div>
                  <div className="col-lg-2">
                    <label htmlFor="profesor" className="form-label mt-2">
                      Profesor:
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <select
                      name="profesor"
                      id="profesor"
                      className="form-select"
                      aria-label="Seleccione un profesor"
                    >
                      <option value="">-- Seleccione un Profesor --</option>
                    </select>
                  </div>
                </div>
                <button className="btn btn-warning mx-auto col-md-2 mt-2 mb-1">
                  Agregar Materia
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CrearMateria;
