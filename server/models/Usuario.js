let mongoose = require("mongoose");
const Materia = require("./Materia");
const Archivo = require("./Archivo");
const Nota = require("./Nota");

let Schema = mongoose.Schema;

let UsuarioSchema = Schema({
  cedula: { type: Number, required: true, min: 8 },
  nombre: { type: String, required: true, minLength: 3 },
  apellido: { type: String, required: true, minLength: 3 },
  fechaNac: { type: Date, required: true },
  telefono: { type: String },
  correo: { type: String, required: true },
  usuario: { type: String, required: true },
  contrasena: { type: String, required: true },
  cargo: {
    type: String,
    required: true,
    enum: ["Estudiante", "Profesor", "Administrador"],
    default: "Estudiante",
  },
  estado: {
    type: String,
    enum: ["Pendiente", "Activo"],
    default: "Pendiente",
  },
  tokenConfirmacion: {
    type: String,
    required: true,
  },
});

UsuarioSchema.post("remove", async (doc) => {
  const resultadoMaterias = await Materia.find({ estudiantes: doc._id });
  const resultadoArchivos = await Archivo.find({ usuario: doc._id });
  const resultadoNotas = await Nota.find({ estudiante: doc._id });

  if (resultadoMaterias !== null) {
    resultadoMaterias.forEach(async (materia) => {
      await Materia.updateOne(
        { _id: materia._id },
        {
          $pull: {
            estudiantes: { _id: doc._id },
          },
        }
      );
    });
  }

  if (resultadoArchivos !== null) {
    resultadoArchivos.forEach(async (archivo) => {
      await archivo.remove();
    });
  }

  if (resultadoNotas !== null) {
    resultadoNotas.forEach(async (nota) => {
      await nota.remove();
    });
  }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
