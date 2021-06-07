import React from "react";

function CrearActividad() {
  return (
    <div className="col mx-3 py-3 px-3 my-auto">
      <div className="card py-3 shadow-lg">
        <h3 className="fw-bold col-md-12 text-center">Agregar una Actividad</h3>
        <form action="">
          <div className="container-fluid my-3 row">
            <div className="container-fluid my-3 row pe-0">
              <div className="col-md-2">
                <label htmlFor="nombre" className="form-label mt-2">
                  Nombre:
                </label>
              </div>
              <div className="col-md-10">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ejemplo: Arreglos - Parte 1"
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
                  placeholder="Ingrese aqui la descripcion de la actividad"
                  required
                ></textarea>
              </div>
            </div>
            <div className="container-fluid my-3 row pe-0">
              <div className="col-lg-2">
                <label htmlFor="nota" className="form-label mt-2 me-0">
                  Nota:
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="number"
                  id="nota"
                  name="nota"
                  className="form-control"
                  placeholder="Ingrese una nota"
                  min="1"
                  required
                />
              </div>
              <div className="col-lg-2">
                <label htmlFor="fechaEntrega" className="form-label mt-2">
                  Fecha de Entrega:
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="date"
                  name="fechaEntrega"
                  id="fechaEntrega"
                  className="form-control"
                />
              </div>
              <div className="container-fluid mt-5 row pe-0">
                <div className="col-lg-5">
                  <label htmlFor="formFile" className="form-label mt-2">
                    (Opcional) Seleccione uno o varios archivos:
                  </label>
                </div>
                <div className="col-lg-7 pe-0">
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    multiple
                  />
                </div>
              </div>
            </div>
            <button className="btn btn-warning mx-auto col-md-2 mt-2 mb-1">
              Agregar Materia
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearActividad;
