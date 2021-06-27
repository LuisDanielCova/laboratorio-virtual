import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";
import Axios from "axios";
import Sidebar from "../complements/Sidebar";
import FormError from "../errors/FormError";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../Routes";

function CrearActividad() {
  const { usuario } = useContext(UserContext);
  const history = useHistory();
  const { idMateria, id } = useParams();
  const [actividad, setActividad] = useState({
    nombre: "",
    descripcion: "",
    fechaEntrega: "",
    nota: 0,
  });
  const [file, setFile] = useState();
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const conseguirActividad = async () => {
      if (id) {
        const response = await Axios.get(
          `${process.env.REACT_APP_SERVER_URL}/materias/${idMateria}/actividad/crear/${id}`
        );
        setActividad(response.data.results);
      }
    };
    conseguirActividad();
  }, [id, idMateria]);

  const agregarActividad = async (actividad, file) => {
    try {
      let data = new FormData();
      data.append("nombre", actividad.nombre);
      data.append("descripcion", actividad.descripcion);
      data.append("fechaEntrega", actividad.fechaEntrega);
      data.append("nota", actividad.nota);
      data.append("file", file);
      const response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/materias/${idMateria}/actividad/crear/${usuario.id}`,
        data
      );
      if (response.status === 200) {
        alert(`Actividad Agregada`);
        history.push(`/materias/${idMateria}/`);
      } else {
        setErrors(response.data.errors.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actualizarActividad = async (actividad) => {
    try {
      const response = await Axios.put(
        `${process.env.REACT_APP_SERVER_URL}/materias/${idMateria}/actividad/crear/${id}`,
        actividad
      );
      if (response.status === 200) {
        alert(`Actividad Editada`);
        history.push(`/materias/${idMateria}/`);
      } else {
        setErrors(response.data.errors.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row flex-nowrap gx-0">
        <Sidebar />
        <div className="col mx-3 py-3 px-3 my-auto">
          <div className="card py-3 shadow-lg">
            <h3 className="fw-bold col-md-12 text-center">
              Agregar una Actividad
            </h3>
            <form
              action=""
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="container-fluid my-3 row">
                <div className="container-fluid my-3 row pe-0">
                  <div className="col-md-2">
                    <label htmlFor="nombre" className="form-label mt-2">
                      Nombre:
                    </label>
                  </div>
                  <div className="col-md-10">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Ejemplo: Arreglos - Parte 1"
                      className="form-control"
                      onChange={(event) => {
                        const { value } = event.target;
                        setActividad({ ...actividad, nombre: value });
                      }}
                      value={actividad.nombre}
                      required
                    />
                    <FormError errors={errors} campo={"nombre"} />
                  </div>
                </div>
                <div className="container-fluid my-3 row pe-0">
                  <div className="col-lg-2">
                    <label htmlFor="descripcion" className="form-label mt-2">
                      Descripcion:
                    </label>
                  </div>
                  <div className="col-lg-10">
                    <textarea
                      name="descripcion"
                      id="descripcion"
                      rows="3"
                      className="form-control"
                      placeholder="Ingrese aqui la descripcion de la actividad"
                      onChange={(event) => {
                        const { value } = event.target;
                        setActividad({ ...actividad, descripcion: value });
                      }}
                      value={actividad.descripcion}
                      required
                    ></textarea>
                    <FormError errors={errors} campo={"descripcion"} />
                  </div>
                </div>
                <div className="container-fluid my-3 row pe-0">
                  <div className="col-lg-2">
                    <label htmlFor="nota" className="form-label mt-2 me-0">
                      Nota:
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <input
                      type="number"
                      id="nota"
                      name="nota"
                      className="form-control"
                      placeholder="Ingrese una nota"
                      min="1"
                      onChange={(event) => {
                        const { value } = event.target;
                        setActividad({ ...actividad, nota: value });
                      }}
                      value={actividad.nota}
                      required
                    />
                    <FormError errors={errors} campo={"nota"} />
                  </div>
                  <div className="col-lg-2">
                    <label htmlFor="fechaEntrega" className="form-label mt-2">
                      Fecha de Entrega:
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <input
                      type="date"
                      name="fechaEntrega"
                      id="fechaEntrega"
                      className="form-control"
                      onChange={(event) => {
                        const { value } = event.target;
                        setActividad({ ...actividad, fechaEntrega: value });
                      }}
                      value={actividad.fechaEntrega}
                    />
                    <FormError errors={errors} campo={"fechaEntrega"} />
                  </div>
                  <div className="container-fluid mt-5 row pe-0">
                    <div className="col-lg-5">
                      <label htmlFor="formFile" className="form-label mt-2">
                        (Opcional) Seleccione un archivo:
                      </label>
                    </div>
                    <div className="col-lg-7 pe-0">
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        onChange={(event) => {
                          const file = event.target.files[0];
                          setFile(file);
                        }}
                        value={file}
                        accept=".zip"
                        multiple
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-warning mx-auto col-md-2 mt-2 mb-1"
                  onClick={() => {
                    if (id) {
                      actualizarActividad(actividad);
                    } else {
                      agregarActividad(actividad, file);
                    }
                  }}
                >
                  Enviar
                </button>
              </div>
            </form>
            <div className="container-fluid row">
              <a
                className="link-dark mx-auto text-center"
                href={`/materias/${idMateria}`}
              >
                Volver
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CrearActividad);
