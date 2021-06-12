let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ActividadSchema = Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fecha_entrega: { type: Date, required: true },
  nota: { type: Number, required: true },
  materia: { type: Schema.Types.ObjectId, ref: "Materia", required: true },
});

module.exports = mongoose.model("Actividad", ActividadSchema);
