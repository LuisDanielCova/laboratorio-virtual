let Profesor = require("../models/Profesor");
const { checkSchema, validationResult } = require("express-validator");
const { profesorSchema } = require("./SchemaValidators/Validators");

// Mostrar todos los profesores
exports.conseguir_lista = (req, res, next) => {
  Profesor.find()
    .sort([["apellido", "ascending"]])
    .exec((err, lista_profesores) => {
      if (err) {
        return next(err);
      }
      res.send(lista_profesores);
    });
};

// Crear profesor

exports.crear_profesor = [
  //Validar y limpiar los campos
  checkSchema(profesorSchema),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        statusCode: 400,
        message: "Datos invalidos",
        errors_array: errors,
      });
    } else {
      let hash = bcrypt.hashSync(
        req.body.contrasena,
        process.env.PASSWORD_SALT
      );
      const profesor = new Profesor({
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecha_nac: req.body.fecha_nac,
        telefono: req.body.telefono,
        correo: req.body.correo,
        usuario: req.body.usuario,
        contrasena: hash,
        cargo: req.body.cargo,
      });

      try {
        await profesor.save();
        res.json({ statusCode: 200 });
      } catch (err) {
        next(err);
      }
    }
  },
];

// Enviar la informacion de un profesor para actualizarlo
exports.actualizar_profesor_get = async (req, res, next) => {
  await Profesor.findById(req.params.id, (err, results) => {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
};

// Actualizar un profesor
exports.actualizar_profesor_put = async (req, res, next) => [
  // Validar los campos
  checkSchema(profesorSchema),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({
        statusCode: 400,
        message: "Datos invalidos",
        errors_array: errors,
      });
    } else {
      let hash = bcrypt.hashSync(
        req.body.contrasena,
        process.env.PASSWORD_SALT
      );
      const profesor = new Profesor({
        cedula: req.body.cedula,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        fecha_nac: req.body.fecha_nac,
        telefono: req.body.telefono,
        correo: req.body.correo,
        usuario: req.body.usuario,
        contrasena: hash,
        cargo: req.body.cargo,
        _id: req.params.id,
      });

      try {
        await Profesor.findByIdAndUpdate(
          req.params.id,
          profesor,
          {},
          function (err) {
            if (err) {
              return next(err);
            }
            res.json({
              statusCode: 200,
              message: "profesor actualizado",
            });
          }
        );
      } catch (err) {
        next(err);
      }
    }
  },
];

// Borrar un profesor
exports.borrar_profesor = async (req, res, next) => {
  await Profesor.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
  });
  res.send({ statusCode: 200, message: "Profesor borrado" });
};
