let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArchivoSchema = Schema({
  nombre: { type: String, required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
  actividad: { type: Schema.Types.ObjectId, ref: "Actividad", required: true },
});

module.exports = mongoose.model("Archivo", ArchivoSchema);
