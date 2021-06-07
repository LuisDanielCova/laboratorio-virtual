let mongoose = require("mongoose");

let Schema = mongoose.Schema;

let ArchivoProfesorSchema = Schema({
  nombre: { type: String, required: true },
  profesor: { type: Schema.Types.ObjectId, ref: "Profesor" },
});

ArchivoProfesorSchema.virtual("url").get(function () {
  return `/archivo/${this.id}`;
});

module.exports = mongoose.model("ArchivoProfesor", ArchivoProfesorSchema);
