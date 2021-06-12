let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let NotaSchema = Schema({
  calificacion: { type: Number, required: true },
  actividad: { type: Schema.Types.ObjectId, ref: "Actividad" },
  alumno: { type: Schema.Types.ObjectId, ref: "Usuario" },
});

module.exports = mongoose.model("Nota", NotaSchema);
