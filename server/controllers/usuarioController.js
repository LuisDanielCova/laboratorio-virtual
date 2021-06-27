const Usuario = require("../models/Usuario");
const Materia = require("../models/Materia");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Mostrar todos los usuarios
exports.conseguir_lista = (req, res, next) => {
  Usuario.find()
    .select(["cedula", "nombre", "apellido", "correo", "cargo"])
    .sort([["cedula", "ascending"]])
    .exec((err, lista_usuarios) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(lista_usuarios);
    });
};

// Mostrar todos los profesores
exports.conseguir_lista_profesores = (req, res, next) => {
  Usuario.find({ cargo: "Profesor" })
    .select(["cedula", "nombre", "apellido", "correo", "cargo"])
    .sort([["cedula", "ascending"]])
    .exec((err, lista_profesores) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(lista_profesores);
    });
};

// Mostrar un usuario
exports.mostrar_usuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.params.id, "-contrasena").exec();
    if (usuario === null) {
      let err = new Error("Usuario no encontrado");
      err.status = 404;
      return next(err);
    }
    if (usuario.cargo === "Profesor") {
      const materias = await Materia.find(
        { profesor: usuario._id },
        "nombre seccion"
      ).exec();
      res.status(200).json({ usuario, materias });
    } else if (usuario.cargo === "Estudiante") {
      const materias = await Materia.find(
        { estudiantes: usuario._id },
        "nombre seccion"
      ).exec();
      res.status(200).json({ usuario, materias });
    } else {
      res
        .status(200)
        .json({ usuario, materias: "El Administrador no tiene materias" });
    }
  } catch (err) {
    if (err) return next(err);
  }
};

// Crear usuario

exports.crear_usuario = [
  //Validar y limpiar los campos
  body("cedula")
    .trim()
    .notEmpty()
    .withMessage("La cedula no puede estar vacia")
    .bail()
    .isInt({ allow_leading_zeroes: true })
    .withMessage("La cedula solo pueden ser caracteres numericos")
    .bail()
    .isLength({ min: 8, max: 8 })
    .withMessage(
      "La cedula solo pueden ser 8 numeros, si tiene una cedula menor a las 10 millones, ingrese un 0 al comienzo"
    )
    .bail()
    .custom(async (value) => {
      const usuario = await Usuario.find({ cedula: value }).limit(1);
      if (usuario !== null) {
        return Promise.reject("La cedula ya esta en uso");
      }
    })
    .bail()
    .escape(),
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .bail()
    .isAlpha(["es-ES"])
    .withMessage("El nombre solo puede contener letras")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 letras")
    .escape(),
  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido no puede estar vacio")
    .bail()
    .isAlpha(["es-ES"])
    .withMessage("El apellido solo puede contener letras")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El apellido debe tener al menos 3 letras")
    .escape(),
  body("fechaNac").trim().isISO8601().withMessage("Fecha Invalida").toDate(),
  body("telefono")
    .trim()
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage(
      "El numero de telefono solo puede contener caracteres numericos"
    )
    .isLength({ min: 11, max: 11 })
    .withMessage("El numero de telefono debe contener 11 numeros")
    .escape(),
  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo no puede estar vacio")
    .bail()
    .isEmail()
    .withMessage("Debe ingresar un correo valido")
    .bail()
    .custom(async (value) => {
      const usuario = await Usuario.find({ correo: value });
      if (usuario !== null) {
        return Promise.reject("El correo ya esta en uso");
      }
    })
    .escape(),
  body("usuario")
    .trim()
    .notEmpty()
    .withMessage("El usuario no puede estar vacio")
    .bail()
    .isAlphanumeric()
    .withMessage("El usuario solo puede contener letras y numeros")
    .bail()
    .custom(async (value) => {
      const usuario = await Usuario.find({ usuario: value });
      if (usuario !== null) {
        return Promise.reject("El usuario ya esta en uso");
      }
    })
    .escape(),
  body("contrasena")
    .trim()
    .notEmpty()
    .withMessage("La contraseña no puede estar vacia")
    .bail()
    .isStrongPassword()
    .withMessage(
      "La contraseña debe contener al menos: 8 caracteres, 1 letra minuscula, 1 letra mayuscula, 1 numero y un caracter especial"
    )
    .escape(),
  body("cargo")
    .trim()
    .notEmpty()
    .withMessage("Seleccione un cargo")
    .bail()
    .isIn([["Estudiante", "Profesor", "Administrador"]])
    .withMessage("Seleccione un cargo valido")
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({
        message: "Datos invalidos",
        errors_array: errors,
      });
    } else {
      const hash = bcrypt.hashSync(
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
  await Usuario.findById(req.params.id, "-contrasena", (err, results) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ results });
  });
};

// Actualizar un usuario
// Un usuario puede actualizar: su correo y sus datos pesonales
// Un usuario no puede actualizar: su usuario y su cargo
exports.actualizar_usuario_put = [
  body("cedula")
    .trim()
    .notEmpty()
    .withMessage("La cedula no puede estar vacia")
    .bail()
    .isInt({ allow_leading_zeroes: true })
    .withMessage("La cedula solo pueden ser caracteres numericos")
    .bail()
    .isLength({ min: 8, max: 8 })
    .withMessage(
      "La cedula solo pueden ser 8 numeros, si tiene una cedula menor a las 10 millones, ingrese un 0 al comienzo"
    )
    .bail()
    .custom(async (value, { req }) => {
      const usuario = await Usuario.find({ cedula: value }).limit(1);
      console.log(usuario);
      if (usuario.length > 0 && usuario[0]._id != req.params.id) {
        return Promise.reject("La cedula ya esta en uso");
      }
    })
    .bail()
    .escape(),
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .bail()
    .isAlpha(["es-ES"])
    .withMessage("El nombre solo puede contener letras")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 letras")
    .escape(),
  body("apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido no puede estar vacio")
    .bail()
    .isAlpha(["es-ES"])
    .withMessage("El apellido solo puede contener letras")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El apellido debe tener al menos 3 letras")
    .escape(),
  body("fechaNac").trim().isISO8601().withMessage("Fecha Invalida").toDate(),
  body("telefono")
    .trim()
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage(
      "El numero de telefono solo puede contener caracteres numericos"
    )
    .isLength({ min: 11, max: 11 })
    .withMessage("El numero de telefono debe contener 11 numeros")
    .escape(),
  body("correo")
    .trim()
    .notEmpty()
    .withMessage("El correo no puede estar vacio")
    .bail()
    .isEmail()
    .withMessage("Debe ingresar un correo valido")
    .bail()
    .custom(async (value, { req }) => {
      const usuario = await Usuario.find({ correo: value }).limit(1);
      if (usuario.length > 0 && usuario[0]._id != req.params.id) {
        return Promise.reject("El correo ya esta en uso");
      }
    })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({
        message: "Datos invalidos",
        errors_array: errors,
      });
    } else {
      try {
        await Usuario.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              cedula: req.body.cedula,
              nombre: req.body.nombre,
              apellido: req.body.apellido,
              fecha_nac: req.body.fecha_nac,
              telefono: req.body.telefono,
              correo: req.body.correo,
            },
          },
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

// Actualiza la contrasena de un usuario
// Solo la actualiza si es diferente a la anterior
exports.actualizar_contrasena = [
  body("contrasena")
    .trim()
    .notEmpty()
    .withMessage("La contraseña no puede estar vacia")
    .bail()
    .isStrongPassword()
    .withMessage(
      "La contraseña debe contener al menos: 8 caracteres, 1 letra minuscula, 1 letra mayuscula, 1 numero y un caracter especial"
    )
    .escape(),
  body("nuevaContrasena")
    .trim()
    .notEmpty()
    .withMessage("La contraseña no puede estar vacia")
    .bail()
    .isStrongPassword()
    .withMessage(
      "La contraseña debe contener al menos: 8 caracteres, 1 letra minuscula, 1 letra mayuscula, 1 numero y un caracter especial"
    )
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({ mensaje: "Datos invalidos", errors });
    } else {
      const { contrasena, contrasenaNueva } = req;
      const usuario = await Usuario.findById(req.params.id, (err, usuario) => {
        if (err) return next(err);
      });
      if (!usuario) {
        let err = new Error("El usuario no existe");
        err.status = 404;
        return next(err);
      }
      bcrypt.compare(contrasena, usuario.contrasena, (err, resultado) => {
        if (err) return next(err);
        if (resultado === true) {
          if (contrasena === contrasenaNueva) {
            res.status(206).json({
              mensaje: "La contrasena nueva debe ser diferente a la anterior",
            });
          } else {
            const hash = bcrypt.hashSync(
              contrasenaNueva,
              process.env.PASSWORD_SALT
            );
            Usuario.findByIdAndUpdate(
              usuario._id,
              {
                $set: {
                  contrasena: hash,
                },
              },
              (err) => {
                if (err) return next(err);
                res.status(200).json({ mensaje: "Contrasena cambiada" });
              }
            );
          }
        } else {
          res.status(206).json({ mensaje: "La contrasena no es correcta" });
        }
      });
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
