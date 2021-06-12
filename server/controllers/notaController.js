const Nota = require("../models/Nota");
const { validationResult, body } = require("express-validator");

// Mostrar todas las notas

exports.mostrar_notas = async (req, res, next) => {
  Nota.find()
    .populate("Actividad")
    .populate("Usuario")
    .exec((err, lista_notas) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ lista_notas: lista_notas });
    });
};

// Crear una nota

exports.crear_nota = [
  body("calificacion")
    .trim()
    .notEmpty()
    .withMessage("La calificacion no puede estar vacia")
    .bail()
    .isInt({ min: 0, max: 20 })
    .withMessage("La calificacion debe estar entre 0 y 20")
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
