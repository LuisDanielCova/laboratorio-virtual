import React from "react";
import Sidebar from "../complements/Sidebar";
import RegistroUsuario from "./RegistroUsuario";

function CrearUsuario() {
  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col py-3">
          <RegistroUsuario />
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;
