let Alumno = require("../models/Alumno");
const { validationResult, checkSchema } = require("express-validator");
const bcrypt = require("bcryptjs");

// CURRENT SESSION ID
let current_id = "";

// SCHEMA

const alumnoSchema = {
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
        return Alumno.find({ cedula: value }).then((alumno) => {
          if (alumno.length > 0 && alumno[0]._id != current_id) {
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
        return Alumno.find({ correo: value }).then((alumno) => {
          if (alumno.length > 0 && alumno[0]._id != current_id) {
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
        return Alumno.find({ usuario: value }).then((alumno) => {
          if (alumno.length > 0 && alumno[0]._id != current_id) {
            console.log(app.locals._id);
            return Promise.reject(`El usuario ya esta en uso`);
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
};

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
  // Asignar el id del alumno al id actual
  (req, res, next) => {
    current_id = req.params.id;
    next();
  },
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
