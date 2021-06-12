import React, { useState, useEffect } from "react";
import Axios from "axios";
import FormError from "./errors/FormError";

function FormaNotas() {
  const [errors, setErrors] = useState([]);
  const [nota, setNota] = useState({
    calificacion: -1,
  });

  const crearNota = async (nota) => {
    try {
      let response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/materias/nota/crear`,
        nota
      );
      if (response.status === 200) {
        console.log(response);
      } else {
        setErrors(response.data.errors_array.errors);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card m-3 p-3">
      <label htmlFor="calificacion" className="form-label">
        Calificacion:
      </label>
      <input
        type="number"
        name="calificacion"
        id="calificacion"
        min="0"
        className="form-control"
        placeholder="0"
        onChange={(event) => {
          const { value } = event.target;
          setNota({ ...nota, calificacion: value });
        }}
        value={nota.calificacion}
      />
      <FormError errors={errors} campo={"calificacion"} />
      <button
        onClick={() => {
          crearNota(nota);
        }}
        className="btn btn-warning"
      >
        Send nota xd
      </button>
    </div>
  );
}

export default FormaNotas;
