let Alumno = require("../models/Alumno");
const {
  body,
  validationResult,
  check,
  checkSchema,
} = require("express-validator");
const { alumnoSchema } = require("./SchemaValidators/Validators");
const bcrypt = require("bcryptjs");

// Enviar una lista con todos los alumnos de la base de datos al frontend
exports.conseguir_lista = (req, res, next) => {
  Alumno.find()
    .sort([["apellido", "ascending"]])
    .exec((err, lista_alumnos) => {
      if (err) {
        return next(err);
      }
      res.send(lista_alumnos);
    });
};

// Crea un alumno, validando y sanitizando los campos necesarios
exports.crear_alumno = [
  //Validar y limpiar los campos
  checkSchema(alumnoSchema),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        statusCode: 400,
        message: "data is invalid",
        errors_array: errors,
      });
    } else {
      let hash = bcrypt.hashSync(
        req.body.contrasena,
        process.env.PASSWORD_SALT
      );
      const alumno = new Alumno({
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecha_nac: req.body.fecha_nac,
        telefono: req.body.telefono,
        correo: req.body.correo,
        usuario: req.body.usuario,
        contrasena: hash,
      });

      try {
        await alumno.save();
        res.json({ statusCode: 200 });
      } catch (err) {
        next(err);
      }
    }
  },
];

// Conseguir un alumno para actualizarlo
exports.actualizar_alumno_get = async (req, res, next) => {
  await Alumno.findById(req.params.id, (err, results) => {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
};

// Actualizar un alumno, validando y sanitizando los datos necesarios
exports.actualizar_alumno_put = [
  // Validar los campos
  checkSchema(alumnoSchema),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        statusCode: 400,
        message: "data is invalid",
        errors_array: errors,
      });
    } else {
      let hash = bcrypt.hashSync(
        req.body.contrasena,
        process.env.PASSWORD_SALT
      );
      const alumno = new Alumno({
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecha_nac: req.body.fecha_nac,
        telefono: req.body.telefono,
        correo: req.body.correo,
        usuario: req.body.usuario,
        contrasena: hash,
        _id: req.params.id,
      });

      try {
        await Alumno.findByIdAndUpdate(
          req.params.id,
          alumno,
          {},
          function (err) {
            if (err) {
              return next(err);
            }
            res.json({
              statusCode: 200,
              message: "alumno actualizado",
            });
          }
        );
      } catch (err) {
        next(err);
      }
    }
  },
];

// Borrar un alumno
exports.borrar_alumno = async (req, res, next) => {
  await Alumno.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
  });
  res.send(`Borrado`);
};
