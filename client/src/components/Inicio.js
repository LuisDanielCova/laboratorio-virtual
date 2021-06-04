import React from "react";
import Navbar from "./complements/Navbar";
import Footer from "./complements/Footer";

function Inicio() {
  return (
    <div className="">
      <Navbar />
      <div className="container">
        <div className="p-5 m-4 bg-warning rounded-3 shadow">
          <div className="container-fluid bg-dark p-3 rounded-3">
            <h1 className="display-3 fw-bold text-center text-light">
              Bienvenido a la UGMA
            </h1>
            <img
              src="https://images.unsplash.com/photo-1563394867331-e687a36112fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1510&q=80"
              alt="Estudiantes con laptops en un salon de clases"
              className="img-fluid mx-auto d-block rounded-3"
              style={{ maxHeight: "400px" }}
            />
            <p className="col-md-12 fs-4 text-center text-light">
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
