const Materia = require("../models/Materia");
const Usuario = require("../models/Usuario");
const Actividad = require("../models/Actividad");
const { validationResult, body } = require("express-validator");

// Mostrar todas las materias

exports.conseguir_lista = (req, res, next) => {
  Materia.find()
    .populate({
      path: "profesor",
      select: ["nombre", "apellido", "correo"],
    })
    .populate({ path: "estudiantes", select: ["nombre", "apellido", "cedula"] })
    .sort([["nombre", "ascending"]])
    .exec((err, lista_materias) => {
      if (err) {
        return next(err);
      }
      res.status(200).send(lista_materias);
    });
};

// Mostrar las Materias de un Profesor

exports.conseguir_materias_profesor = async (req, res, next) => {
  try {
    const materias = await Materia.find({ profesor: req.params.id })
      .populate({
        path: "profesor",
        select: ["nombre", "apellido", "correo"],
      })
      .populate({
        path: "estudiantes",
        select: ["nombre", "apellido", "cedula"],
      })
      .sort([["nombre", "ascending"]])
      .exec();
    if (materias === null) {
      let err = new Error("El profesor no tiene materias");
      err.status = 404;
      return next(err);
    }
    res.json({ materias });
  } catch (err) {
    if (err) next(err);
  }
};

// Mostrar las materias de un estudiante

exports.conseguir_materias_estudiante = async (req, res, next) => {
  try {
    const materias = await Materia.find({ estudiantes: req.params.id })
      .populate({
        path: "profesor",
        select: ["nombre", "apellido", "correo"],
      })
      .populate({
        path: "estudiantes",
        select: ["nombre", "apellido", "cedula"],
      })
      .sort([["nombre", "ascending"]])
      .exec();
    if (materias === null) {
      let err = new Error("El estudiante no tiene materias");
      err.status = 404;
      return next(err);
    }
    res.json({ materias });
  } catch (err) {
    if (err) next(err);
  }
};

// Mostrar una materia

exports.mostrar_materia = async (req, res, next) => {
  try {
    const materia = await Materia.findById(req.params.id)
      .populate({
        path: "profesor",
        select: ["nombre", "apellido", "correo"],
      })
      .populate({
        path: "estudiantes",
        select: ["nombre", "apellido", "correo", "cedula"],
      })
      .exec();
    if (materia === null) {
      let err = new Error("No existe la materia");
      err.status = 404;
      return next(err);
    }
    res.status(200).json({ materia });
  } catch (err) {
    if (err) return next(err);
  }
};

// Inscribir un estudiante en una materia
exports.inscribir_estudiante = async (req, res, next) => {
  const { idMateria, idEstudiante } = req.params;
  try {
    const estudiante = await Usuario.findById(idEstudiante).exec();

    await Materia.findByIdAndUpdate(
      idMateria,
      { $addToSet: { estudiantes: estudiante._id } },
      (err) => {
        if (err) return next(err);
        res.json("Usuario Inscrito");
      }
    );
  } catch (err) {
    if (err) return next(err);
  }
};

// Crear una materia

exports.crear_materia = [
  // Validar los datos
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener minimo 3 caracteres")
    .bail()
    .matches(/^[A-Za-z0-9\s.:-]+$/)
    .withMessage(
      "El nombre solo puede contener letras, numeros y los caracteres especiales: ':', '.', '-' y ' '"
    )
    .bail()
    .custom(async (value) => {
      const materia = await Materia.findOne({ nombre: value }).limit(1);
      if (materia !== null) {
        console.log(materia);
        return Promise.reject("El nombre de la materia ya esta en uso");
      }
    })
    .escape(),
  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripcion no puede estar vacia")
    .escape(),
  body("seccion")
    .trim()
    .notEmpty()
    .withMessage("La seccion no puede estar vacia")
    .bail()
    .isAlphanumeric(["es-ES"], { ignore: " -" })
    .withMessage(
      "La seccion solo puede tener numeros, letras y los caracteres especiales: '-' y ' '"
    )
    .escape(),
  body("profesor")
    .trim()
    .notEmpty()
    .withMessage("Debe seleccionar un profesor")
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({
        message: "Datos invalidos",
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
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacio")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener minimo 3 caracteres")
    .bail()
    .matches(/^[A-Za-z0-9\s.:-]+$/)
    .withMessage(
      "El nombre solo puede contener letras, numeros y los caracteres especiales: ':', '.', '-' y ' '"
    )
    .bail()
    .custom(async (value, { req }) => {
      const materia = await Materia.findOne({ nombre: value }).limit(1);
      if (materia !== null && materia._id != req.params.id) {
        return Promise.reject("El nombre de la materia ya esta en uso");
      }
    })
    .escape(),
  body("descripcion")
    .trim()
    .notEmpty()
    .withMessage("La descripcion no puede estar vacia")
    .escape(),
  body("seccion")
    .trim()
    .notEmpty()
    .withMessage("La seccion no puede estar vacia")
    .bail()
    .isAlphanumeric(["es-ES"], { ignore: " -" })
    .withMessage(
      "La seccion solo puede tener numeros, letras y los caracteres especiales: '-' y ' '"
    )
    .escape(),
  body("profesor")
    .trim()
    .notEmpty()
    .withMessage("Debe seleccionar un profesor")
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(206).json({ mensaje: "Datos invalidos", errors: errors });
    } else {
      try {
        await Materia.findByIdAndUpdate(
          req.params.id,
          {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            seccion: req.body.seccion,
            profesor: req.body.profesor,
            _id: req.params.id,
          },
          (err) => {
            if (err) {
              next(err);
            }
            res.status(200).json({ mensaje: "Materia actualizada" });
          }
        );
      } catch (err) {
        next(err);
      }
    }
  },
];

// Borrar

exports.borrar_materia = async (req, res, next) => {
  const materia = await Materia.findById(req.params.id);
  if (materia) {
    const idMateria = materia._id;
    await materia.remove((err) => {
      if (err) return next(err);
      res.status(200).json({ mensaje: "Materia borrada exitosamente" });
    });

    const resultados = await Actividad.find({ materia: idMateria }).exec();

    resultados.forEach(async (actividad) => {
      await actividad.remove((err) => {
        if (err) return next(err);
      });
    });
  }
};
