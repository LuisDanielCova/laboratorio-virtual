import React from "react";
import { useHistory } from "react-router-dom";

function Navbar(props) {
  const history = useHistory();

  return (
    <div className="">
      <div
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#ffc107" }} //#ffc107 #ffcd39
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:3000">
            <img
              src="https://seeklogo.com/images/U/UGMA-logo-2BA53AE2C9-seeklogo.com.png"
              width="30"
              height="25"
              className="d-inline-block align-text-top me-2"
              alt="Logo de la Universidad"
            />
            UGMA
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a href="/" className="nav-link active">
                Inicio
              </a>
              <a href="/contacto" className="nav-link active">
                Contactenos
              </a>
              <nav className="nav-item dropdown">
                <nav
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Registro
                </nav>
                <nav
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="/registro">
                    Registro de Estudiante
                  </a>
                  <a className="dropdown-item" href="/recuperar">
                    Recuperar Contraseña
                  </a>
                </nav>
              </nav>
            </div>
            {props.login === undefined && (
              <div className="navbar-nav flex-row flex-wrap ms-md-auto">
                <button
                  className="btn btn-outline-dark"
                  type="button"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  Iniciar Sesion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
