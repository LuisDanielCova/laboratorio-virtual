let Alumno = require("../../models/Alumno");
let Profesor = require("../../models/Profesor");

exports.alumnoSchema = {
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
        return Alumno.find({ cedula: value }).then((profesor) => {
          if (profesor.length > 0) {
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
        return Alumno.find({ correo: value }).then((profesor) => {
          if (profesor.length > 0) {
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
        return Alumno.find({ usuario: value }).then((profesor) => {
          if (profesor.length > 0) {
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
};

exports.profesorSchema = {
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
        return Profesor.find({ cedula: value }).then((profesor) => {
          if (profesor.length > 0) {
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
          if (profesor.length > 0) {
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
          if (profesor.length > 0) {
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
    in: {
      options: ["Profesor", "Coordinador"],
      errorMessage: "Solo puede asignarse 'Profesor' o 'Coordinador'",
    },
    escape: true,
  },
};
