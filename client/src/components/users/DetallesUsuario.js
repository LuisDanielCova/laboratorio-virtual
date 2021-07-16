import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../complements/Sidebar";
import { UserContext } from "../../Routes";
import BorrarUsuario from "./BorrarUsuario";

function DetallesUsuario() {
  const { id } = useParams();
  const history = useHistory();
  const { usuario } = useContext(UserContext);
  const [detallesUsuario, setUsuario] = useState("");
  const [accionesUsuario, setAccionesUsuario] = useState("");
  const [accionesAdmin, setAccionesAdmin] = useState("");

  useEffect(() => {
    const conseguirUsuario = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/${id}`
      );
      if (response.status === 200) {
        setUsuario(response.data.usuario);
      } else {
        console.log(response);
      }
    };
    conseguirUsuario();
  }, [id]);

  useEffect(() => {
    if (usuario.id === detallesUsuario._id) {
      setAccionesUsuario(
        <div className="card px-3 py-2 mt-1">
          <h4 className="fw-bold">Acciones:</h4>
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/usuario/crear/${detallesUsuario._id}`);
            }}
          >
            <i className="bi bi-pencil"></i> Editar Detalles
          </button>
          <button
            className="btn btn-warning mt-1"
            onClick={() => {
              history.push(`/usuario/cambiarcontrasena/`);
            }}
          >
            <i className="bi bi-pencil"></i> Cambiar Contraseña
          </button>
        </div>
      );
    }
    //eslint-disable-next-line
  }, [usuario, detallesUsuario]);

  useEffect(() => {
    if (usuario.cargo === "Administrador") {
      setAccionesAdmin(
        <div className="card px-3 py-2 mt-1">
          <h4 className="fw-bold">Acciones:</h4>
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/usuario/crear/${detallesUsuario._id}`);
            }}
          >
            <i className="bi bi-pencil"></i> Editar
          </button>
          {detallesUsuario && (
            <BorrarUsuario usuario={detallesUsuario} tabla={false} />
          )}
        </div>
      );
    }
    //eslint-disable-next-line
  }, [usuario, detallesUsuario]);

  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col m-3">
          <div className="card py-3 shadow-lg">
            <h3 className="fw-bold col-md-12 text-center">
              Detalles del Usuario
            </h3>
            <div className="row m-3">
              <div className="col-lg-8 my-2">
                <div className="card p-4">
                  <h4 className="fw-bold card-text">Detalles Personales:</h4>
                  <div className="py-2">
                    <p className="card-text">
                      <i className="bi bi-person"></i>{" "}
                      <strong>Nombre Completo:</strong>{" "}
                      {detallesUsuario && detallesUsuario.nombre}{" "}
                      {detallesUsuario && detallesUsuario.apellido}
                    </p>
                    <p className="card-text">
                      <i className="bi bi-card-text"></i>{" "}
                      <strong>Cedula:</strong>{" "}
                      {detallesUsuario && detallesUsuario.cedula}
                    </p>
                    <p className="card-text">
                      <i className="bi bi-calendar3"></i>{" "}
                      <strong>Fecha de Nacimiento:</strong>{" "}
                      {detallesUsuario && detallesUsuario.fechaNac.slice(0, 10)}
                    </p>
                    <p className="card-text">
                      <i className="bi bi-telephone"></i>{" "}
                      <strong>Telefono:</strong>{" "}
                      {detallesUsuario && detallesUsuario.telefono}
                    </p>
                    <p className="card-text">
                      <i className="bi bi-envelope"></i>{" "}
                      <strong>Correo:</strong>{" "}
                      {detallesUsuario && detallesUsuario.correo}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 my-2">
                <div className="card p-2">
                  <div className="card p-2">
                    <h4 className="fw-bold">Detalles de Usuario:</h4>
                    <p className="card-text">
                      <i className="bi bi-person-badge"></i>{" "}
                      <strong>Nombre de Usuario:</strong>{" "}
                      {detallesUsuario && detallesUsuario.usuario}
                    </p>
                    <p className="card-text">
                      <strong>
                        <i className="bi bi-person-circle"></i> Cargo:
                      </strong>{" "}
                      {detallesUsuario && detallesUsuario.cargo}
                    </p>
                  </div>
                  {accionesUsuario}
                  {accionesAdmin}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallesUsuario;
