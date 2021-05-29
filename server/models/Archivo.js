let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArchivoSchema = Schema({
  nombre: { type: String, required: true },
  profesor: { type: Schema.Types.ObjectId, ref: "Profesor" },
  alumno: { type: Schema.Types.ObjectId, ref: "Alumno" },
});

ArchivoSchema.virtual("url").get(function () {
  return `/archivo/${this.id}`;
});

module.exports = mongoose.model("Archivo", ArchivoSchema);
