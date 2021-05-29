let Profesor = require("../models/Profesor");
const { checkSchema, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

let current_id = "";

// SCHEMA

const profesorSchema = {
  cedula: {
    trim: true,
    notEmpty: {
      errorMessage: "La cedula no puede estar vacia",
    },
    isInt: {
      errorMessage: "La cedula deben ser solo numeros",
    },
    isLength: {
      errorMessage:
        "La cedula debe tener 8 numeros, si la cedula es menor a 10 millones, agregue un 0 al comienzo",
      options: { min: 8, max: 8 },
    },
    custom: {
      options: (value) => {
        return Profesor.find({ cedula: value })
          .limit(1)
          .then((profesor) => {
            if (profesor[0]._id != current_id) {
              return Promise.reject("La cedula ya esta en uso");
            }
          });
      },
    },
    escape: true,
  },
  nombre: {
    trim: true,
    notEmpty: {
      errorMessage: "El nombre no puede estar vacio",
    },
    isAlpha: {
      errorMessage: "El nombre solo debe contener letras",
    },
    isLength: {
      errorMessage: "El nombre debe tener al menos 3 letras",
      options: { min: 3 },
    },
    escape: true,
  },
  apellido: {
    trim: true,
    notEmpty: {
      errorMessage: "El apellido no puede estar vacio",
    },
    isAlpha: {
      errorMessage: "El apellido solo debe contener letras",
    },
    isLength: {
      errorMessage: "El apellido debe tener al menos 3 letras",
      options: { min: 3 },
    },
    escape: true,
  },
  fecha_nac: {
    isISO8601: {
      errorMessage: "La fecha es invalida",
    },
    toDate: true,
  },
  telefono: {
    trim: true,
    optional: {
      checkFalsy: true,
    },
    isInt: {
      errorMessage: "Telefono invalido, solo debe contener numeros",
    },
    isLength: {
      errorMessage: "El telefono debe contener 11 numeros",
      options: { min: 11, max: 11 },
    },
    escape: true,
  },
  correo: {
    trim: true,
    notEmpty: {
      errorMessage: "El correo no puede estar vacio",
    },
    isEmail: {
      errorMessage: "El correo debe ser valido",
    },
    custom: {
      options: (value) => {
        return Profesor.find({ correo: value }).then((profesor) => {
          if (profesor[0]._id != current_id) {
            return Promise.reject("El correo ya esta en uso");
          }
        });
      },
    },
    escape: true,
  },
  usuario: {
    trim: true,
    notEmpty: {
      errorMessage: "El usuario no puede estar vacio",
    },
    isAlphanumeric: {
      errorMessage: "El usuario debe tener solo letras y numeros",
    },
    custom: {
      options: (value) => {
        return Profesor.find({ usuario: value }).then((profesor) => {
          if (profesor[0]._id != current_id) {
            return Promise.reject("El usuario ya esta en uso");
          }
        });
      },
    },
    escape: true,
  },
  contrasena: {
    trim: true,
    notEmpty: {
      errorMessage: "La contraseña no puede estar vacia",
    },
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      errorMessage:
        "La contraseña debe tener minimo 8 caracteres, 1 letra minuscula, 1 letra mayuscula, 1 numero y 1 caracter especial",
    },
    escape: true,
  },
  cargo: {
    trim: true,
    notEmpty: {
      errorMessage: "Seleccione un cargo",
      bail: true,
    },
    isIn: {
      options: [["Profesor", "Coordinador"]],
      errorMessage: "Solo puede escoger 'Profesor' o 'Coordinador'",
    },
    escape: true,
  },
};

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
exports.actualizar_profesor_put = [
  // Validar los campos
  (req, res, next) => {
    current_id = req.params.id;
    next();
  },
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

exports.pruebaloca = async (req, res, next) => {
  console.log(`doings shit`);
  console.log(req.app.locals._id);
  const entries = Object.keys(req.body);
  const updates = {};
  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }
  this.actual_user = req.params.id;
  res.json(updates);
};
