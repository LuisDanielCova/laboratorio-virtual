let Actividad = require("../models/Actividad");
const { checkSchema, validationResult } = require("express-validator");

let current_id = "";

// SCHEMA

// MOSTRAR TODAS LAS ACTIVIDADES
exports.conseguir_lista = (req, res, next) => {
  Actividad.find()
    .populate("materia")
    .sort([["fecha_entrega", "asc"]])
    .exec((err, lista_actividades) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ lista_actividades });
    });
};

// CREAR UNA ACTIVIDAD

exports.crear_actividad = [
  async (req, res, next) => {
    const actividad = new Actividad({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      fecha_entrega: req.body.fecha_entrega,
      nota: req.body.nota,
      materia: req.body.materia,
    });
    try {
      await actividad.save();
      res.status(200).json({ mensaje: "actiidad creada" });
    } catch (err) {
      res.status(400);
      next(err);
    }
  },
];

// ACTUALIZAR UNA ACTIVIDAD - GET

exports.actualizar_actividad_get = async (req, res, next) => {
  try {
    await Actividad.findById(req.params.id, (err, results) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ results });
    });
  } catch (err) {
    res.status(400);
    next(err);
  }
};

// ACTUALIZAR UNA ACTIVIDAD - PUT

exports.actualizar_actividad_put = [
  (req, res, next) => {
    current_id = req.params.id;
    next();
  },
  async (req, res, next) => {
    const actividad = new Actividad({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      seccion: req.body.seccion,
      profesor: req.body.profesor,
      _id: req.params.id,
    });
    try {
      await Actividad.findByIdAndUpdate(req.params.id, actividad, (err) => {
        if (err) {
          next(err);
        }
        res.status(200).json({ message: "Actividad actualizada" });
      });
    } catch (err) {
      res.status(400);
      next(err);
    }
  },
];

// BORRAR UNA ACTIVIDAD
exports.borrar_actividad = async (req, res, next) => {
  await Actividad.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.status(400);
      return next(err);
    }
    res.status(200).json({ mensaje: "Actividad Borrada" });
  });
};
