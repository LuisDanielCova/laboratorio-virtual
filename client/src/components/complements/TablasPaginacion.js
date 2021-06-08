import React from "react";

const TablasPaginacion = ({
  usuariosPorPaginas,
  usuariosTotal,
  paginacion,
  paginaActual,
}) => {
  const numerosPagina = [];

  for (let i = 1; i <= Math.ceil(usuariosTotal / usuariosPorPaginas); i++) {
    numerosPagina.push(i);
  }

  return (
    <nav className="pagination justify-content-center">
      <li className="page-item">
        <button
          onClick={() => {
            paginacion(1);
          }}
          className="page-link"
          aria-label="primero"
        >
          &laquo;
        </button>
      </li>
      <li className="page-item">
        <button
          onClick={() => {
            let paginaAnterior;
            paginaActual !== 1
              ? (paginaAnterior = paginaActual - 1)
              : (paginaAnterior = 1);
            paginacion(paginaAnterior);
          }}
          className="page-link"
        >
          Anterior
        </button>
      </li>
      <li className="page-item">
        <button className="page-link">{paginaActual}</button>
      </li>
      <li className="page-item">
        <button
          onClick={() => {
            let paginaSiguiente;
            paginaActual !== numerosPagina.length
              ? (paginaSiguiente = paginaActual + 1)
              : (paginaSiguiente = numerosPagina.length);
            paginacion(paginaSiguiente);
          }}
          className="page-link"
        >
          Siguiente
        </button>
      </li>
      <li className="page-item">
        <button
          onClick={() => {
            paginacion(numerosPagina.length);
          }}
          className="page-link"
          aria-label="ultimo"
        >
          &raquo;
        </button>
      </li>
    </nav>
  );
};

export default TablasPaginacion;
