let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MateriaSchema = Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  seccion: { type: String, required: true },
  profesor: { type: Schema.Types.ObjectId, ref: "Profesor", required: true },
  alumnos: [{ type: Schema.Types.ObjectId, ref: "Alumno" }],
});

MateriaSchema.virtual("url").get(function () {
  return `/materia/${this._id}`;
});

module.exports = mongoose.model("Materia", MateriaSchema);
