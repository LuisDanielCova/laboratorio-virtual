let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let MateriaSchema = Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  seccion: { type: String, required: true },
  profesor: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  estudiantes: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
});

module.exports = mongoose.model("Materia", MateriaSchema);
