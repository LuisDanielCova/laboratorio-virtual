const Actividad = require("../models/Actividad");
const FileModel = require("../models/Archivo");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");
const { promisify } = require("util");
const e = require("express");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();

// MOSTRAR TODAS LAS ACTIVIDADES
exports.conseguir_lista = async (req, res, next) => {
  Actividad.find({ materia: req.params.id })
    .populate("materia")
    .sort([["fecha_entrega", "asc"]])
    .exec((err, lista_actividades) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ lista_actividades: lista_actividades });
    });
};

// MOSTRAR UNA ACTIVIDAD
exports.mostrar_actividad = async (req, res, next) => {
  try {
    const actividad = await Actividad.findById(req.params.id)
      .populate("materia", "nombre")
      .exec();
    if (actividad === null) {
      let err = new Error("La actividad no existe");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({ actividad });
  } catch (err) {
    if (err) return next(err);
  }
};

// CREAR UNA ACTIVIDAD

exports.crear_actividad = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .bail()
    .isAlphanumeric(["es-ES"], { ignore: " -" })
    .withMessage(
      "El nombre solo puede contener letras, numeros y los caracteres especiales: '-' y ' '"
    )
    .custom(async (value, { req }) => {
      const actividad = await Actividad.findOne({ nombre: value }).limit(1);
      if (actividad.length > 0 && actividad.materia === req.body.materia) {
        return Promise.reject("El nombre de la actividad ya esta en uso");
      }
    })
    .escape(),
  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripcion no puede estar vacia")
    .bail()
    .isLength({ min: 30 })
    .withMessage("La descripcion debe tener minimo 30 caracteres")
    .escape(),
  body("fechaEntrega")
    .trim()
    .notEmpty()
    .withMessage("La fecha no puede estar vacia")
    .bail()
    .isISO8601()
    .withMessage("Fecha invalida")
    .bail()
    .escape(),
  body("nota")
    .trim()
    .notEmpty()
    .withMessage("La nota no puede estar vacia")
    .bail()
    .isInt()
    .withMessage("La nota debe ser un numero entero")
    .escape(),
  upload.single("file"),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({ mensaje: "Datos invalidos", errors: errors });
    } else {
      const { file } = req;
      const actividad = new Actividad({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha_entrega: req.body.fecha_entrega,
        nota: req.body.nota,
        materia: req.body.materia,
      });
      try {
        const nuevaActividad = await actividad.save();
        // Si la actividad se ha guardado, y se ha subido un archivo
        if (nuevaActividad !== null && file !== null) {
          if (file.detectedFileExtension != ".zip") {
            next(new Error("Invalid file type"));
          }
          const fileName = `${uuid()}-${file.originalName}`;
          await pipeline(
            file.stream,
            fs.createWriteStream(`${__dirname}/../public/files/${fileName}`)
          );
          const fileDB = new FileModel({
            nombre: fileName,
            actividad: nuevaActividad._id,
          });
          await fileDB.save();
          res.status(200).json({ mensaje: "actividad creada con archivo" });
        } else {
          res.status(200).json({ mensaje: "actividad creada" });
        }
      } catch (err) {
        res.status(400);
        next(err);
      }
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
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .bail()
    .isAlphanumeric(["es-ES"], { ignore: " -" })
    .withMessage(
      "El nombre solo puede contener letras, numeros y los caracteres especiales: '-' y ' '"
    )
    .custom(async (value, { req }) => {
      const actividad = await Actividad.findOne({ nombre: value }).limit(1);
      if (
        actividad.length > 0 &&
        actividad.materia === req.body.materia &&
        actividad._id !== req.params.id
      ) {
        return Promise.reject("El nombre de la actividad ya esta en uso");
      }
    })
    .escape(),
  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripcion no puede estar vacia")
    .bail()
    .isLength({ min: 30 })
    .withMessage("La descripcion debe tener minimo 30 caracteres")
    .escape(),
  body("fechaEntrega")
    .trim()
    .notEmpty()
    .withMessage("La fecha no puede estar vacia")
    .bail()
    .isISO8601()
    .withMessage("Fecha invalida")
    .bail()
    .escape(),
  body("nota")
    .trim()
    .notEmpty()
    .withMessage("La nota no puede estar vacia")
    .bail()
    .isInt()
    .withMessage("La nota debe ser un numero entero")
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({
        mensaje: "Datos invalidos",
        errors: errors,
      });
    } else {
      try {
        await Actividad.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              nombre: req.body.nombre,
              descripcion: req.body.descripcion,
              seccion: req.body.seccion,
              profesor: req.body.profesor,
            },
          },
          (err) => {
            if (err) {
              next(err);
            }
            res.status(200).json({ message: "Actividad actualizada" });
          }
        );
      } catch (err) {
        res.status(400);
        next(err);
      }
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
