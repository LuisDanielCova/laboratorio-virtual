let Materia = require("../models/Materia");
const { checkSchema, validationResult } = require("express-validator");

let current_id = "";

// SCHEMA
const materiaSchema = {
  nombre: {
    trim: true,
    notEmpty: {
      errorMessage: "El nombre no puede estar vacio",
    },
    isLength: {
      errorMessage: "El nombre debe tener al menos 3 letras",
      options: { min: 3 },
    },
    escape: true,
  },
  descripcion: {
    trim: true,
    notEmpty: {
      errorMessage: "La descripcion no puede estar vacia",
    },
    escape: true,
  },
  seccion: {
    trim: true,
    notEmpty: {
      errorMessage: "La seccion no puede estar vacia",
    },
    isAlphanumeric: {
      locale: "es-ES",
      ignore: " -",
      errorMessage:
        "La seccion solo puede contener letras, numeros y caracteres especiales '-' y ' '",
    },
    escape: true,
  },
  profesor: {
    trim: true,
    notEmpty: {
      errorMessage: "Seleccione un profesor",
    },
    escape: true,
  },
};

// Mostrar todas las materias

exports.conseguir_lista = (req, res, next) => {
  Materia.find()
    .populate("profesor")
    .sort([["nombre", "ascending"]])
    .exec((err, lista_materias) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ lista_materias: lista_materias });
    });
};

// Crear una materia

exports.crear_materia = [
  // Validar los datos
  checkSchema(materiaSchema),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({
        message: "Invalid data",
        errors,
      });
    } else {
      const materia = new Materia({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        seccion: req.body.seccion,
        profesor: req.body.profesor,
      });
      try {
        await materia.save();
        res.status(200).json({ message: "materia creada" });
      } catch (error) {
        res.status(400).json({ mensaje: error });
        next(error);
      }
    }
  },
];

// Conseguir informacion para actualizar

exports.actualizar_materia_get = async (req, res, next) => {
  try {
    await Materia.findById(req.params.id, (err, results) => {
      if (err) {
        return next(err);
      }
      res.status(200).json(results);
    });
  } catch (err) {
    next(err);
  }
};

// Actualizar

exports.actualizar_materia_put = [
  (req, res, next) => {
    current_id = req.params.id;
    next();
  },
  checkSchema(materiaSchema),
  async (req, res, next) => {
    const materia = new Materia({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      seccion: req.body.seccion,
      profesor: req.body.profesor,
      _id: req.params.id,
    });
    try {
      await Materia.findByIdAndUpdate(req.params.id, materia, (err) => {
        if (err) {
          next(err);
        }
        res.status(200).json({ message: "Materia actualizada" });
      });
    } catch (err) {
      next(err);
    }
  },
];

// Borrar

exports.borrar_materia = async (req, res, next) => {
  await Materia.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Materia Borrada" });
  });
};
