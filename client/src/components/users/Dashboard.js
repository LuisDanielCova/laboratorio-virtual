import React from "react";
import Sidebar from "../complements/Sidebar";

function Dashboard() {
  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col py-3">
          <div className="col-xxl-8 px-5 py-4 my-5 shadow-lg">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
              <div className="col-10 col-sm-8 col-lg-6">
                <img
                  src="https://images.unsplash.com/photo-1548174753-897b449b097e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                  alt=""
                  className="d-block mx-lg-auto img-fluid rounded-3"
                />
              </div>
              <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-3">
                  Bienvenido al Laboratorio Virtual
                </h1>
                <p className="lead">
                  Aqui podras realizar las actividades de programacion de la
                  universidad desde la comodidad de tu casa.
                </p>
                <p className="lead">
                  Utiliza la barra de navegacion al lado izquierdo de la pagina
                  para acceder a las diferentes funciones que les ofrecemos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
