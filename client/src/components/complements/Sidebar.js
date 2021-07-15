import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../Routes";

function Sidebar() {
  const history = useHistory();
  const { usuario, setUsuario } = useContext(UserContext);
  const [liMaterias, setLiMaterias] = useState();
  const [liUsuarios, setLiUsuarios] = useState();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUsuario(undefined);
    history.push("/");
  };

  useEffect(() => {
    if (usuario.cargo === "Administrador") {
      setLiMaterias(
        <li>
          <a
            href="#submenu1"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle link-warning"
          >
            <i className="fs-4 bi bi-book"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Materias</span>{" "}
          </a>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu1"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <a href="/materia/crear" className="nav-link px-0 link-warning">
                {" "}
                <span className="d-none d-sm-inline">Crear Materia</span>{" "}
              </a>
            </li>
            <li>
              <a href="/materias/" className="nav-link px-0 link-warning">
                {" "}
                <span className="d-none d-sm-inline">Lista de Materias</span>
              </a>
            </li>
          </ul>
        </li>
      );
      setLiUsuarios(
        <li>
          <a
            href="#submenu2"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle link-warning"
          >
            <i className="fs-4 bi-people"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Usuarios</span>{" "}
          </a>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu2"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <a href="/usuario/crear" className="nav-link link-warning px-0">
                {" "}
                <span className="d-none d-sm-inline">Crear Usuario</span>
              </a>
            </li>
            <li>
              <a href="/usuarios/" className="nav-link px-0 link-warning">
                {" "}
                <span className="d-none d-sm-inline">Lista de Usuarios</span>
              </a>
            </li>
          </ul>
        </li>
      );
    } else if (usuario.cargo === "Profesor") {
      setLiMaterias(
        <li>
          <a
            href="#submenu1"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle link-warning"
          >
            <i className="fs-4 bi bi-book"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Materias</span>{" "}
          </a>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu1"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <a href={`/materias`} className="nav-link px-0 link-warning">
                {" "}
                <span className="d-none d-sm-inline">Mis Materias</span>{" "}
              </a>
            </li>
          </ul>
        </li>
      );
    } else if (usuario.cargo === "Estudiante") {
      setLiMaterias(
        <li>
          <a
            href="#submenu1"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle link-warning"
          >
            <i className="fs-4 bi bi-book"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Materias</span>{" "}
          </a>
          <ul
            id="submenu1"
            className="collapse nav flex-colum ms-1"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <a
                href={`/materias/inscribir`}
                className="nav-link px-0 link-warning"
              >
                {" "}
                <span className="d-none d-sm-inline">
                  Inscribir Materias
                </span>{" "}
              </a>
            </li>
          </ul>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu1"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <a href={`/materias/`} className="nav-link px-0 link-warning">
                {" "}
                <span className="d-none d-sm-inline">Mis Materias</span>{" "}
              </a>
            </li>
          </ul>
        </li>
      );
    } else if (usuario.status === false) {
      // Redirigir o algo asi cool
    }
  }, [usuario]);

  return (
    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 sticky-top">
        <a
          href="/inicio"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <img
            src="https://seeklogo.com/images/U/UGMA-logo-2BA53AE2C9-seeklogo.com.png"
            width="30"
            height="25"
            className="d-inline-block align-text-top me-2"
            alt="Logo de la Universidad"
          />
          <span className="fs-5 d-none d-sm-inline">Menu</span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <a
              href="/inicio"
              className="nav-link link-warning align-middle px-0"
            >
              <i className="fs-4 bi-house"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Inicio</span>
            </a>
          </li>
          {usuario.status && liMaterias}
          <li>
            <a
              href={`/notas/`}
              className="nav-link px-0 align-middle link-warning"
            >
              <i className="fs-4 bi bi-award"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Notas</span>
            </a>
          </li>
          <li>
            <a
              href={process.env.REACT_APP_IDE_URL}
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle link-warning"
            >
              <i className="fs-4 bi bi-terminal"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Compilador</span>
            </a>
          </li>
          {usuario.status && liUsuarios}
        </ul>
        <hr />
        <div className="dropdown pb-4">
          <a
            href="/"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://icon-library.com/images/anon-icon/anon-icon-6.jpg"
              alt="hugenerd"
              width="30"
              height="30"
              className="rounded-circle"
            />
            <span className="d-none d-sm-inline mx-1">{usuario.usuario}</span>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-small shadow"
            aria-labelledby="dropdownUser1"
          >
            <li>
              <a className="dropdown-item" href={`/usuarios/${usuario.id}`}>
                {" "}
                Perfil
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="btn text-light" onClick={logout}>
                Cerrar Sesion
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
