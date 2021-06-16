let mongoose = require("mongoose");

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
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
