const Nota = require("../models/Nota");
const { validationResult, body } = require("express-validator");

// Mostrar todas las notas
exports.mostrar_notas = async (req, res, next) => {
  Nota.find()
    .populate("estudiante", ["nombre", "apellido"])
    .populate({
      path: "actividad",
      select: ["nombre"],
      populate: { path: "materia", select: ["nombre", "seccion"] },
    })
    .exec((err, lista_notas) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ lista_notas: lista_notas });
    });
};

// Mostrar todas las notas de un estudiante
exports.mostrar_notas_estudiante = async (req, res, next) => {
  Nota.find({ estudiante: req.params.id })
    .populate("estudiante", ["nombre", "apellido"])
    .populate({
      path: "actividad",
      select: ["nombre"],
      populate: { path: "materia", select: ["nombre", "seccion"] },
    })
    .exec((err, lista_notas) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ lista_notas: lista_notas });
    });
};

// Mostrar una nota

exports.mostrar_nota = async (req, res, next) => {
  try {
    const nota = await Nota.findById(req.params.id)
      .populate("actividad", "nombre")
      .populate("estudiante", "nombre apellido cedula")
      .exec();
    if (nota === null) {
      let err = new Error("La nota no existe");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({ nota });
  } catch (err) {
    if (err) return next(err);
  }
};

// Crear una nota
exports.crear_nota = [
  body("calificacion")
    .trim()
    .notEmpty()
    .withMessage("La calificacion no puede estar vacia")
    .bail()
    .isInt({ min: 1, max: 20 })
    .withMessage("La calificacion debe estar entre 1 y 20")
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({
        message: "Invalid Data",
        errors_array: errors,
      });
    } else {
      const nota = new Nota({
        calificacion: req.body.calificacion,
        actividad: req.body.actividad,
        alumno: req.body.alumno,
      });
      try {
        await nota.save();
        res.status(200).json({ mensaje: "Nota creada" });
      } catch (err) {
        res.status(206).json({ mensaje: err });
        next(err);
      }
    }
  },
];

// Actualizar Nota

exports.actualizar_nota = [
  body("calificacion")
    .trim()
    .notEmpty()
    .withMessage("La calificacion no puede estar vacia")
    .bail()
    .isInt({ min: 1, max: 20 })
    .withMessage("La calificacion debe estar entre 1 y 20")
    .escape(),
  async (req, res, next) => {
    try {
      await Nota.findByIdAndUpdate(
        req.body.id,
        {
          $set: { calificacion: req.body.calificacion },
        },
        (err) => {
          if (err) {
            next(err);
          }
          res.status(200).json({ message: "Nota actualizada" });
        }
      );
    } catch (err) {
      res.status(206).json({ mensaje: err });
    }
  },
];

// Borrar nota
exports.borrar_nota = async (req, res, next) => {
  await Nota.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(400);
      return next(err);
    }
    res.status(200).json({ mensaje: "Nota Borrada" });
  });
};
