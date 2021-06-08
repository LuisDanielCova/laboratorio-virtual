import React, { useState, useEffect } from "react";
import axios from "axios";
import TablasUsuarios from "../complements/TablasUsuarios";
import TablasPaginacion from "../complements/TablasPaginacion";
import TablasPaginas from "../complements/TablasPaginas";

function LeerUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const [usuariosPorPagina, setUsuariosPorPagina] = useState(10);
  const [valorBusqueda, setValorBusqueda] = useState("");
  const [usuariosActuales, setUsuariosActuales] = useState([]);
  const [usuariosTotal, setUsuariosTotal] = useState(0);

  const indexUltimoUsuario = paginaActual * usuariosPorPagina;
  const indexPrimerUsuario = indexUltimoUsuario - usuariosPorPagina;

  useEffect(() => {
    const conseguirUsuarios = async () => {
      setCargando(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setUsuarios(response.data);
      setCargando(false);
    };

    conseguirUsuarios();
  }, []);

  useEffect(() => {
    const filtrarValor = (valor) => {
      if (valor.title.includes(valorBusqueda)) {
        return true;
      }
      return false;
    };

    if (valorBusqueda !== "") {
      const usuariosBusqueda = usuarios.filter(filtrarValor);
      setUsuariosActuales(
        usuariosBusqueda.slice(indexPrimerUsuario, indexUltimoUsuario)
      );
      setUsuariosTotal(usuariosBusqueda.length);
    } else {
      setUsuariosActuales(
        usuarios.slice(indexPrimerUsuario, indexUltimoUsuario)
      );
      setUsuariosTotal(usuarios.length);
    }
  }, [usuarios, indexPrimerUsuario, indexUltimoUsuario, valorBusqueda]);

  const paginacion = (numeroPagina) => setPaginaActual(numeroPagina);
  const paginas = (numero) => setUsuariosPorPagina(numero);

  return (
    <div className="col m-3">
      <h1 className="display-2">Lista de Usuarios</h1>
      <p className="lead">
        Aqui puede observar una lista de todos los usuarios registrados.
      </p>
      <div className="">
        <div className="row mb-1">
          <div className="col-lg-4 col-sm-4">
            <TablasPaginas paginas={paginas} />
          </div>
          <div className="col-lg-8 d-flex justify-content-end row">
            <div className="col-lg-3 d-flex justify-content-end">
              <label htmlFor="buscar" className="form-label mt-2">
                Buscar Cedula:
              </label>
            </div>
            <div className="col-lg-4 pe-0">
              <input
                type="text"
                id="buscar"
                name="buscar"
                placeholder="Ejemplo: 25416008"
                className="form-control"
                value={valorBusqueda}
                onChange={(e) => {
                  const { value } = e.target;
                  setValorBusqueda(value);
                  setPaginaActual(1);
                }}
                required
              />
            </div>
          </div>
        </div>
        <TablasUsuarios usuarios={usuariosActuales} cargando={cargando} />
        <TablasPaginacion
          usuariosPorPaginas={usuariosPorPagina}
          usuariosTotal={usuariosTotal}
          paginacion={paginacion}
          paginaActual={paginaActual}
        />
      </div>
    </div>
  );
}

export default LeerUsuarios;
