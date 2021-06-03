let Usuario = require("../models/Usuario");
const { checkSchema, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

let current_id = "";

// SCHEMA

const usuarioSchema = {
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
        return Usuario.find({ cedula: value })
          .limit(1)
          .then((usuario) => {
            if (usuario.length > 0 && usuario[0]._id != current_id) {
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
        return Usuario.find({ correo: value }).then((usuario) => {
          if (usuario.length > 0 && usuario[0]._id != current_id) {
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
        return Usuario.find({ usuario: value }).then((usuario) => {
          if (usuario.length > 0 && usuario[0]._id != current_id) {
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
      options: [["Estudiante", "Profesor", "Coordinador"]],
      errorMessage:
        "Solo puede escoger 'Estudiante', 'Profesor' o 'Coordinador'",
    },
    escape: true,
  },
};

// Mostrar todos los usuarios
exports.conseguir_lista = (req, res, next) => {
  Usuario.find()
    .sort([["apellido", "ascending"]])
    .exec((err, lista_usuarios) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(lista_usuarios);
    });
};

// Crear usuario

exports.crear_usuario = [
  //Validar y limpiar los campos
  checkSchema(usuarioSchema),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({
        message: "Datos invalidos",
        errors_array: errors,
      });
    } else {
      let hash = bcrypt.hashSync(
        req.body.contrasena,
        process.env.PASSWORD_SALT
      );
      const usuario = new Usuario({
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
        await usuario.save();
        res.status(200).json({ message: "Usuario creado" });
      } catch (err) {
        next(err);
      }
    }
  },
];

// Enviar la informacion de un usuario para actualizarlo
exports.actualizar_usuario_get = async (req, res, next) => {
  await Usuario.findById(req.params.id, (err, results) => {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
};

// Actualizar un usuario
exports.actualizar_usuario_put = [
  // Validar los campos
  (req, res, next) => {
    current_id = req.params.id;
    next();
  },
  checkSchema(usuarioSchema),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({
        message: "Datos invalidos",
        errors_array: errors,
      });
    } else {
      let hash = bcrypt.hashSync(
        req.body.contrasena,
        process.env.PASSWORD_SALT
      );
      const usuario = new Usuario({
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
        await Usuario.findByIdAndUpdate(
          req.params.id,
          usuario,
          {},
          function (err) {
            if (err) {
              return next(err);
            }
            res.status(200).json({
              message: "Usuario actualizado",
            });
          }
        );
      } catch (err) {
        next(err);
      }
    }
  },
];

// Borrar un usuario
exports.borrar_usuario = async (req, res, next) => {
  await Usuario.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: "Usuario borrado" });
  });
};

// Actualizar todos los campos que se manden
// exports.pruebaloca = async (req, res, next) => {
//   console.log(`doings shit`);
//   console.log(req.app.locals._id);
//   const entries = Object.keys(req.body);
//   const updates = {};
//   for (let i = 0; i < entries.length; i++) {
//     updates[entries[i]] = Object.values(req.body)[i];
//   }
//   this.actual_user = req.params.id;
//   res.json(updates);
// };
