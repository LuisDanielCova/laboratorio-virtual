const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
  idUsuario: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Usuario",
  },
  token: {
    type: String,
    required: true,
  },
  creado: {
    type: Date,
    default: Date.now,
    expires: 3600, // tiempo de expiracion en segundos
  },
});

module.exports = mongoose.model("Token", tokenSchema);
