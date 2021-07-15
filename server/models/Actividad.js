const mongoose = require("mongoose");
const Materia = require("./Materia");
const Nota = require("./Nota");
const Archivo = require("./Archivo");

const Schema = mongoose.Schema;

const ActividadSchema = Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  fechaEntrega: { type: Date, required: true },
  nota: { type: Number, required: true },
  materia: { type: Schema.Types.ObjectId, ref: "Materia", required: true },
});

ActividadSchema.post("save", async (doc) => {
  const resultado = await Materia.find({ _id: doc.materia })
    .populate({
      path: "estudiantes",
      select: ["_id"],
    })
    .exec();

  if (resultado[0].estudiantes !== undefined) {
    resultado[0].estudiantes.forEach(async (estudiante) => {
      const nota = new Nota({
        calificacion: 0,
        actividad: doc._id,
        estudiante: estudiante._id,
      });
      await nota.save();
    });
  }
});

ActividadSchema.post("remove", async (doc) => {
  const resultadoNotas = await Nota.find({ actividad: doc._id }).exec();
  const resultadoArchivos = await Archivo.find({ actividad: doc._id }).exec();

  resultadoNotas.forEach(async (nota) => {
    await nota.remove();
  });

  resultadoArchivos.forEach(async (archivo) => {
    await archivo.remove();
  });
});

module.exports = mongoose.model("Actividad", ActividadSchema);
