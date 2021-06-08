import React from "react";

const TablasPaginas = ({ paginas }) => {
  return (
    <div className="">
      <label className="">Usuarios por Pagina: </label>
      <label htmlFor="">
        <select
          name="paginas"
          id="paginas"
          className="form-select ms-1"
          onChange={(e) => {
            const { value } = e.target;
            paginas(value);
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </label>
    </div>
  );
};

export default TablasPaginas;
