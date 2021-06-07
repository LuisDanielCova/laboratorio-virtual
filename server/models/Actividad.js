let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ActividadSchema = Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha_entrega: { type: Date, required: true },
  nota: { type: Number, required: true },
  materia: { type: Schema.Types.ObjectId, ref: "Materia", required: true },
  archivosProfesor: { type: Schema.Types.ObjectId, ref: "ArchivoProfesor" },
});

ActividadSchema.virtual("url").get(function () {
  return `/actividad/${this._id}`;
});

module.exports = mongoose.model("Actividad", ActividadSchema);
