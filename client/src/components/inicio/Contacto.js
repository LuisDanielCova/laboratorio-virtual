import React, { useContext } from "react";
import Navbar from "../complements/Navbar";
import Footer from "../complements/Footer";
import { UserContext } from "../../Routes";

function Contacto({ stuff }) {
  const { usuario } = useContext(UserContext);

  console.log(usuario);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="card p-5 m-5 mx-auto">
          <h3>Contactenos</h3>
          <div className="mt-3">
            <p>Creado por: Luis Daniel Cova</p>
            <p>Numero de Telefono: 0416-9861942</p>
            <p>Correo Electronico: ldcn96@gmail.com</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contacto;
