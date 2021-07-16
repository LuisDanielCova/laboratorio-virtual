import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import FormError from "../errors/FormError";
import { UserContext } from "../../Routes";

function RegistroUsuario() {
  const history = useHistory();
  const { usuario } = useContext(UserContext);
  const { id } = useParams();
  const [errors, setErrors] = useState([]);
  const [campoAdmin, setCampoAdmin] = useState("");
  const [button, setButton] = useState("");
  const [usuarioNuevo, setUsuario] = useState({
    cedula: "",
    nombre: "",
    apellido: "",
    fechaNac: "",
    telefono: "",
    correo: "",
    usuario: "",
    contrasena: "",
    cargo: "Estudiante",
  });

  useEffect(() => {
    if (usuario.cargo === "Administrador" && id === undefined) {
      setCampoAdmin(
        <div className="container-fluid ps-0 my-3 row">
          <div className="col-lg-1">
            <label htmlFor="correo" className="form-label mt-2">
              Cargo:
            </label>
          </div>
          <div className="col-md-5">
            <select
              name="cargo"
              id="cargo"
              className="form-control"
              onChange={(e) => {
                const { value } = e.target;
                setUsuario({ ...usuarioNuevo, cargo: value });
              }}
            >
              <option value="">-- Seleccione un Cargo --</option>
              <option value="Profesor">Profesor</option>
              <option value="Estudiante">Estudiante</option>
            </select>
            <FormError errors={errors} campo={"correo"} />
          </div>
        </div>
      );
      setButton(
        <button
          className="btn btn-warning"
          onClick={() => {
            if (id) {
              actualizarUsuario(usuarioNuevo);
            } else {
              agregarUsuario(usuarioNuevo, usuario.cargo);
            }
          }}
        >
          Registrar
        </button>
      );
    } else {
      setButton(
        <button
          className="btn btn-warning"
          onClick={() => {
            if (id) {
              actualizarUsuario(usuarioNuevo);
            } else {
              agregarUsuario(usuarioNuevo);
            }
          }}
        >
          Registrarse
        </button>
      );
    }
    //eslint-disable-next-line
  }, [usuario, errors, usuarioNuevo, id]);

  useEffect(() => {
    const conseguirUsuario = async () => {
      const response = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/actualizar/${id}`
      );
      setUsuario({ ...response.data.results, contrasena: "" });
    };
    if (id !== undefined) {
      conseguirUsuario();
    }
  }, [id]);

  const agregarUsuario = async (usuario, cargo) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/crear`,
        usuario
      );
      if (response.status === 200) {
        if (cargo === "Administrador") {
          alert(
            "El usuario ha sido creado, se envio un mensaje al correo electronico para que confirme"
          );
          history.push("/usuarios/");
        } else {
          alert(response.data.msg);
          history.push("/login/");
        }
      } else {
        setErrors(response.data.errors_array.errors);
      }
    } catch (err) {
      alert(`Ha ocurrido un error, intente nuevamente en unos minutos`);
    }
  };

  const actualizarUsuario = async (usuario) => {
    try {
      let response = await Axios.put(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/actualizar/${id}`,
        usuario
      );
      if (response.status === 200) {
        alert("Actualizacion Exitosa!");
        history.push(`/usuarios/${id}`);
      } else {
        setErrors(response.data.errors_array.errors);
      }
    } catch (err) {
      alert(`Ha ocurrido un error, intente nuevamente en unos minutos`);
    }
  };

  return (
    <div className="m-3">
      <div className="container">
        <div className="card p-5 m-5 mx-auto shadow-lg">
          <h3 className="fw-bold col-md-12">Registro de Usuario</h3>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="container-fluid ps-0 my-3 row">
              <div className="col-lg-1">
                <label htmlFor="cedula" className="form-label mt-2">
                  Cedula:
                </label>
              </div>
              <div className="col-lg-11">
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  placeholder="Ejemplo: 25416008"
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setUsuario({ ...usuarioNuevo, cedula: value });
                  }}
                  value={usuarioNuevo.cedula}
                  required
                />
                <FormError errors={errors} campo={"cedula"} />
              </div>
            </div>
            <div className="container-fluid ps-0 my-3 row">
              <div className="col-xl-1">
                <label htmlFor="nombre" className="form-label mt-2">
                  Nombre:
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ejemplo: Luis"
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setUsuario({ ...usuarioNuevo, nombre: value });
                  }}
                  value={usuarioNuevo.nombre}
                  required
                />
                <FormError errors={errors} campo={"nombre"} />
              </div>
              <div className="col-lg-1">
                <label htmlFor="apellido" className="form-label mt-2">
                  Apellido:
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  placeholder="Ejemplo: Cova"
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setUsuario({ ...usuarioNuevo, apellido: value });
                  }}
                  value={usuarioNuevo.apellido}
                  required
                />
                <FormError errors={errors} campo={"apellido"} />
              </div>
            </div>
            <div className="container-fluid ps-0 my-3 row">
              <div className="col-lg-3">
                <label htmlFor="fechaNac" className="form-label mt-2 me-0">
                  Fecha de Nacimiento:
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="date"
                  id="fechaNac"
                  name="fechaNac"
                  className="form-control"
                  value={usuarioNuevo.fechaNac.slice(0, 10)}
                  onChange={(event) => {
                    const { value } = event.target;
                    setUsuario({ ...usuarioNuevo, fechaNac: value });
                  }}
                  required
                />
                <FormError errors={errors} campo={"fechaNac"} />
              </div>
              <div className="col-lg-1">
                <label htmlFor="telefono" className="form-label mt-2">
                  Telefono:
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  placeholder="Ejemplo: 04169861942"
                  onChange={(event) => {
                    const { value } = event.target;
                    setUsuario({ ...usuarioNuevo, telefono: value });
                  }}
                  value={usuarioNuevo.telefono}
                  className="form-control"
                />
                <FormError errors={errors} campo={"telefono"} />
              </div>
            </div>
            <div className="container-fluid ps-0 my-3 row">
              <div className="col-lg-1">
                <label htmlFor="correo" className="form-label mt-2">
                  Correo:
                </label>
              </div>
              <div className="col-md-11">
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  placeholder="Ejemplo: ldcn96@gmail.com"
                  className="form-control"
                  onChange={(event) => {
                    const { value } = event.target;
                    setUsuario({ ...usuarioNuevo, correo: value });
                  }}
                  value={usuarioNuevo.correo}
                  required
                />
                <FormError errors={errors} campo={"correo"} />
              </div>
            </div>
            {!id && (
              <div className="container-fluid ps-0 my-3 row">
                <div className="col-lg-1">
                  <label htmlFor="usuario" className="form-label mt-2">
                    Usuario:
                  </label>
                </div>
                <div className="col-lg-5">
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    placeholder="Ejemplo: LuisCova"
                    className="form-control"
                    onChange={(event) => {
                      const { value } = event.target;
                      setUsuario({ ...usuarioNuevo, usuario: value });
                    }}
                    value={usuarioNuevo.usuario}
                    required
                  />
                  <FormError errors={errors} campo={"usuario"} />
                </div>
                <div className="col-lg-2">
                  <label htmlFor="contrasena" className="form-label mt-2">
                    Contraseña:
                  </label>
                </div>
                <div className="col-lg-4">
                  <input
                    type="password"
                    id="contrasena"
                    name="contrasena"
                    placeholder="8 caracteres minimo"
                    className="form-control"
                    onChange={(event) => {
                      const { value } = event.target;
                      setUsuario({ ...usuarioNuevo, contrasena: value });
                    }}
                    value={usuarioNuevo.contrasena}
                    required
                  />
                  <FormError errors={errors} campo={"contrasena"} />
                </div>
              </div>
            )}
            {campoAdmin}
            {button}
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistroUsuario;
