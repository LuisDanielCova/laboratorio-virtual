import React from "react";
import Navbar from "../complements/Navbar";
import Footer from "../complements/Footer";

function Inicio() {
  return (
    <div className="">
      <Navbar />
      <div className="col-xxl-12 px-5 py-4 my-4 shadow-lg">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1563394867331-e687a36112fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1510&q=80"
              alt=""
              className="d-block mx-lg-auto img-fluid rounded-3"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">
              Bienvenido a la UGMA
            </h1>
            <p className="lead">
              Este sitio web sirve como salon virtual de clases para los
              estudiantes de las carreras de Ingenieria Informatica e Ingenieria
              de Sistemas de la UGMA
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Inicio;
