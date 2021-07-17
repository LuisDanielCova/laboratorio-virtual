import React from "react";
import { useHistory, Link } from "react-router-dom";

function Navbar(props) {
  const history = useHistory();

  return (
    <div className="">
      <div
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#ffc107" }} //#ffc107 #ffcd39
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://seeklogo.com/images/U/UGMA-logo-2BA53AE2C9-seeklogo.com.png"
              width="30"
              height="25"
              className="d-inline-block align-text-top me-2"
              alt="Logo de la Universidad"
            />
            UGMA
          </Link>
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
              <Link to="/" className="nav-link active">
                Inicio
              </Link>
              <Link to="/contacto" className="nav-link active">
                Contactenos
              </Link>
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
                  <Link className="dropdown-item" to="/registro">
                    Registro de Estudiante
                  </Link>
                  <Link className="dropdown-item" to="/recuperar">
                    Recuperar Contraseña
                  </Link>
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
