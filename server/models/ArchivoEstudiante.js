let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArchivoEstudianteSchema = Schema({
  nombre: { type: String, required: true },
  alumno: { type: Schema.Types.ObjectId, ref: "Alumno" },
  actividad: { type: Schema.Types.ObjectId, ref: "Actividad", required: true },
});

ArchivoEstudianteSchema.virtual("url").get(function () {
  return `/archivo/${this.id}`;
});

module.exports = mongoose.model("ArchivoEstudiante", ArchivoEstudianteSchema);
