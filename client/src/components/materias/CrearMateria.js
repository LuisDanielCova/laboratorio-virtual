import React, { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../complements/Sidebar";
import { useHistory, useParams, withRouter } from "react-router-dom";
import FormError from "../errors/FormError";

function CrearMateria() {
  const { id } = useParams();
  const history = useHistory();
  const [materia, setMateria] = useState({
    nombre: "",
    descripcion: "",
    seccion: "",
    profesor: "",
  });
  const [profesores, setProfesores] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    async function conseguirProfesores() {
      const response = await Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/usuarios/profesores`
      );
      setProfesores(response.data);
    }
    conseguirProfesores();
  }, []);

  useEffect(() => {
    const conseguirMateria = async () => {
      try {
        if (id) {
          let response = await Axios.get(
            `${process.env.REACT_APP_SERVER_URL}/materias/crear/${id}`
          );
          setMateria(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    conseguirMateria();
  }, [id]);

  const agregarMateria = async (materia) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/materias/crear`,
        materia,
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      );
      if (response.status === 200) {
        alert(`Materia Agregada`);
        history.push("/materias/");
      } else if (response.status === 206) {
        setErrors(response.data.errors.errors);
      } else {
        alert(`Usuario no tiene sesion activa`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const actualizarMateria = async (materia) => {
    try {
      let response = await Axios.put(
        `${process.env.REACT_APP_SERVER_URL}/materias/crear/${id}`,
        materia
      );
      if (response.status === 200) {
        alert("Materia actualizada!");
        history.push("/materias/");
      } else {
        console.log(response);
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
              Agregar una Materia
            </h3>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="container-fluid my-3 row">
                <div className="container-fluid my-3 row pe-0">
                  <div className="col-2">
                    <label htmlFor="nombre" className="form-label mt-2">
                      Nombre:
                    </label>
                  </div>
                  <div className="col-md-10">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      placeholder="Ejemplo: Programacion 3"
                      className="form-control"
                      value={materia.nombre}
                      onChange={(event) => {
                        const { value } = event.target;
                        setMateria({ ...materia, nombre: value });
                      }}
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
                      placeholder="Ingrese aqui la descripcion de la materia"
                      value={materia.descripcion}
                      onChange={(event) => {
                        const { value } = event.target;
                        setMateria({ ...materia, descripcion: value });
                      }}
                      required
                    ></textarea>
                    <FormError errors={errors} campo={"descripcion"} />
                  </div>
                </div>
                <div className="container-fluid my-3 row pe-0">
                  <div className="col-lg-2">
                    <label htmlFor="seccion" className="form-label mt-2 me-0">
                      Seccion:
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <input
                      type="text"
                      id="seccion"
                      name="seccion"
                      className="form-control"
                      placeholder="Ejemplo: T1"
                      value={materia.seccion}
                      onChange={(event) => {
                        const { value } = event.target;
                        setMateria({ ...materia, seccion: value });
                      }}
                      required
                    />
                    <FormError errors={errors} campo={"seccion"} />
                  </div>
                  <div className="col-lg-2">
                    <label htmlFor="profesor" className="form-label mt-2">
                      Profesor:
                    </label>
                  </div>
                  <div className="col-lg-4">
                    <select
                      name="profesor"
                      id="profesor"
                      className="form-select"
                      aria-label="Seleccione un profesor"
                      value={materia.profesor}
                      onChange={(event) => {
                        const { value } = event.target;
                        setMateria({ ...materia, profesor: value });
                      }}
                    >
                      <option value="">-- Seleccione un Profesor --</option>
                      {profesores.map((profesor) => {
                        return (
                          <option key={profesor._id} value={profesor._id}>
                            {profesor.apellido}, {profesor.nombre}
                          </option>
                        );
                      })}
                    </select>
                    <FormError errors={errors} campo={"profesor"} />
                  </div>
                </div>
                <button
                  className="btn btn-warning mx-auto col-md-2 mt-2 mb-1"
                  onClick={() => {
                    if (id) {
                      actualizarMateria(materia);
                    } else {
                      agregarMateria(materia);
                    }
                  }}
                >
                  Enviar Materia
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CrearMateria);
