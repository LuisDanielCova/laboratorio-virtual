import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../../Routes";

export const TarjetasArchivoProfesorSubir = () => {
  const history = useHistory();
  const [file, setFile] = useState("");
  const { idActividad } = useParams();
  const { usuario } = useContext(UserContext);

  const subirArchivo = async () => {
    const data = new FormData();
    data.append("file", file);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/archivos/subir/${idActividad}/${usuario.id}`,
      data
    );
    if (response.status === 200) {
      history.go(0);
    }
  };

  return (
    <div>
      <h5 className="card-text">Subir Archivo:</h5>
      <div className="card col-lg-4 mb-2">
        <h6 className="card-header bg-dark text-center text-light">
          <i className="col bi bi-file-earmark"></i> Seleccione un Archivo
        </h6>
        <form
          action=""
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="file"
            name="file"
            id="file"
            className="form-control"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
            }}
            accept=".zip"
          />
        </form>
        <button
          className="col btn btn-warning rounded-0"
          onClick={subirArchivo}
        >
          <i className="col bi bi-upload"></i> Subir
        </button>
      </div>
    </div>
  );
};
