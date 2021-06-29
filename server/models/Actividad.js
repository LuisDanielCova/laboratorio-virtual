const mongoose = require("mongoose");
const Materia = require("./Materia");
const Nota = require("./Nota");

const Schema = mongoose.Schema;

const ActividadSchema = Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaEntrega: { type: Date, required: true },
  nota: { type: Number, required: true },
  materia: { type: Schema.Types.ObjectId, ref: "Materia", required: true },
});

ActividadSchema.post("save", async (doc) => {
  const resultado = await Materia.findOne({ _id: doc.materia })
    .populate({
      path: "estudiantes",
      select: ["_id"],
    })
    .exec();

  resultado.estudiantes.forEach(async (estudiante) => {
    const nota = new Nota({
      calificacion: 0,
      actividad: doc._id,
      estudiante: estudiante._id,
    });
    await nota.save();
  });
});

module.exports = mongoose.model("Actividad", ActividadSchema);
