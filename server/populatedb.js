#! /usr/bin/env node

console.log(
  `Este archivo va a poblar la base de datos con usuarios, materias, actividades, notas y archivos`
);

const Usuario = require("./models/Usuario");
const Materia = require("./models/Materia");
const Actividad = require("./models/Actividad");
const Archivo = require("./models/Archivo");
const Nota = require("./models/Nota");

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;
const async = require("async");

const mongoDB = `mongodb://localhost:27017/test1`;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let usuarios = [];
let materias = [];
let actividades = [];
let archivos = [];
let notas = [];

const createUsuario = (c, n, a, fn, t, co, u, con, car, cb) => {
  detallesUsuario = {
    cedula: c,
    nombre: n,
    apellido: a,
    fechaNac: fn,
    telefono: t,
    correo: co,
    usuario: u,
    contrasena: con,
    cargo: car,
  };

  const usuario = new Usuario(detallesUsuario);

  usuario.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("Nuevo Usuario: " + usuario);
    usuarios.push(usuario);
    cb(null, usuario);
  });
};

const createMateria = (n, d, s, p, es, cb) => {
  detallesMateria = {
    nombre: n,
    descripcion: d,
    seccion: s,
    profesor: p,
    estudiantes: es,
  };

  const materia = new Materia(detallesMateria);
  materia.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`Nueva Materia: ${materia}`);
    materias.push(materia);
    cb(null, materia);
  });
};

const createActividad = (n, d, fE, no, m, cb) => {
  detallesActividad = {
    nombre: n,
    descripcion: d,
    fechaEntrega: fE,
    nota: no,
    materia: m,
  };

  const actividad = new Actividad(detallesActividad);
  actividad.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`Nueva Actividad: ${actividad}`);
    actividades.push(actividad);
    cb(null, actividad);
  });
};

const createNota = (c, a, e, cb) => {
  detallesNota = {
    calificacion: c,
    actividad: a,
    estudiante: e,
  };

  const nota = new Nota(detallesNota);
  nota.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`Nueva Nota: ${nota}`);
    notas.push(nota);
    cb(null, nota);
  });
};

const createArchivo = (n, u, a, cb) => {
  detallesArchivo = {
    nombre: n,
    usuario: u,
    actividad: a,
  };

  const archivo = new Archivo(detallesArchivo);
  archivo.save((err) => {
    if (err) {
      cb(err, null);
      return;
    }
    console.log(`Nuevo Archivo: ${archivo}`);
    archivos.push(archivo);
    cb(null, archivo);
  });
};

function crearUsuarios(cb) {
  async.series(
    [
      function (callback) {
        const contrasena = "Password123.";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date(1996, 04, 03);
        createUsuario(
          25416008,
          "Luis",
          "Cova",
          fecha,
          "04169861942",
          "ldcn96@gmail.com",
          "LuisCova",
          hash,
          "Administrador",
          callback
        );
      },
      function (callback) {
        const contrasena = "Contrasena123.";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date("2000-05-21T11:19:57-07:00");
        createUsuario(
          16080211,
          "Charles",
          "Tran",
          fecha,
          "04162672388",
          "imperdiet@turpisnecmauris.edu",
          "GravidaInstitute",
          hash,
          "Profesor",
          callback
        );
      },
      function (callback) {
        const contrasena = "ContrasenA123.";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date("1994-12-08T12:22:06-08:00");
        createUsuario(
          16290327,
          "Bernard",
          "Hayden",
          fecha,
          "04144103033",
          "Cras@euismodmauris.edu",
          "IpsumPrimis",
          hash,
          "Profesor",
          callback
        );
      },
      function (callback) {
        const contrasena = "ContraseNA123.";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date("1961-01-05T13:47:54-08:00");
        createUsuario(
          16570718,
          "Silas",
          "Mueller",
          fecha,
          "04264103033",
          "odio.auctor.vitae@Mauriseu.co.uk",
          "NuncSed",
          hash,
          "Estudiante",
          callback
        );
      },
      function (callback) {
        const contrasena = "ContrasENA123.";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date("1990-09-14T22:57:32-07:00");
        createUsuario(
          16730406,
          "Ferdinand",
          "French",
          fecha,
          "04123257769",
          "luctus.aliquet.odio@purus.ca",
          "NecOrci",
          hash,
          "Estudiante",
          callback
        );
      },
      function (callback) {
        const contrasena = "Contrasena123*";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date("1990-09-14T22:57:32-07:00");
        createUsuario(
          16130706,
          "Ray",
          "Blanchard",
          fecha,
          "04241518820",
          "Pellentesque.habitant.morbi@maurisanunc.com",
          "NamInterdum",
          hash,
          "Estudiante",
          callback
        );
      },
      function (callback) {
        const contrasena = "ContrasenA123*";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date("1974-01-28T23:00:42-07:00");
        createUsuario(
          16680520,
          "Harper",
          "Rosa",
          fecha,
          "04244068172",
          "ligula.eu.enim@ullamcorpervelit.ca",
          "OrnareInFaucibus",
          hash,
          "Estudiante",
          callback
        );
      },
      function (callback) {
        const contrasena = "ContraseNA123*";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date("1994-04-15T04:37:45-07:00");
        createUsuario(
          16650729,
          "Prescott",
          "Cooley",
          fecha,
          "04264405077",
          "est.Mauris@mollis.net",
          "NecAssociates",
          hash,
          "Estudiante",
          callback
        );
      },
      function (callback) {
        const contrasena = "Password123*";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date("1993-01-27T05:22:23-08:00");
        createUsuario(
          16720322,
          "Coby",
          "Bonner",
          fecha,
          "04241343724",
          "Aenean.eget@eutempor.edu",
          "PorttitorTellus",
          hash,
          "Estudiante",
          callback
        );
      },
      function (callback) {
        const contrasena = "PAssword123*";
        const hash = bcrypt.hashSync(contrasena, process.env.PASSWORD_SALT);
        const fecha = new Date("1992-06-30T09:20:31-07:00");
        createUsuario(
          16450811,
          "Thaddeus",
          "Leonard",
          fecha,
          "04124064031",
          "ipsum.Curabitur.consequat@Nunccommodo.com",
          "VestibulumAccumsan",
          hash,
          "Estudiante",
          callback
        );
      },
    ],
    cb
  );
}

function crearMaterias(cb) {
  async.parallel(
    [
      function (callback) {
        createMateria(
          "Programacion 1",
          "En esta materia se daran los puntos basicos para la programacion, desde la creacion de pseudocodigo hasta los diagramas de flujo",
          "M1",
          usuarios[1],
          [usuarios[3], usuarios[5], usuarios[7]],
          callback
        );
      },
      function (callback) {
        createMateria(
          "Programacion 2",
          "En esta materia se continua enseñando la programacion desde arreglos hasta funciones",
          "M1",
          usuarios[2],
          [usuarios[4], usuarios[9]],
          callback
        );
      },
      function (callback) {
        createMateria(
          "Programacion 3",
          "En esta materia se enseña la programacion orientada a objetos, desde clases hasta polimorfismo",
          "T1",
          usuarios[2],
          [usuarios[6], usuarios[8]],
          callback
        );
      },
      function (callback) {
        createMateria(
          "Desarrollo de Software 1",
          "En esta materia se vera el proceso requerido para el desarrollo de software",
          "T1",
          usuarios[1],
          [usuarios[3], usuarios[6], usuarios[8]],
          callback
        );
      },
      function (callback) {
        createMateria(
          "Desarrollo de Software 2",
          "En esta materia se continuan observando las diferentes metodologias para el desarrollo de software",
          "T1",
          usuarios[2],
          [usuarios[4], usuarios[5], usuarios[9]],
          callback
        );
      },
    ],
    cb
  );
}

function crearActividades(cb) {
  async.parallel(
    [
      function (callback) {
        const fecha = new Date(2021, 05, 10);
        createActividad(
          "Hola Mundo",
          "Crear un programa basico para observar como funciona el lenguaje",
          fecha,
          20,
          materias[0],
          callback
        );
      },
      function (callback) {
        const fecha = new Date(2021, 05, 21);
        createActividad(
          "Condiciones - Parte 1",
          "Crear un programa mostrando el funcionamiento basico de las condiciones",
          fecha,
          20,
          materias[0],
          callback
        );
      },
      function (callback) {
        const fecha = new Date(2021, 05, 12);
        createActividad(
          "Ciclos - Parte 1",
          "Crear un programa que muestre los datos de un arreglo de forma ciclica",
          fecha,
          20,
          materias[1],
          callback
        );
      },
      function (callback) {
        const fecha = new Date(2021, 05, 24);
        createActividad(
          "Ciclos - Parte 2",
          "Crear un programa que registre datos en un arreglo y los muestre",
          fecha,
          20,
          materias[1],
          callback
        );
      },
      function (callback) {
        const fecha = new Date(2021, 05, 12);
        createActividad(
          "Funciones - Parte 1",
          "Crear un programa que realice varias operaciones matematicas con funciones",
          fecha,
          20,
          materias[2],
          callback
        );
      },
      function (callback) {
        const fecha = new Date(2021, 05, 12);
        createActividad(
          "Funciones - Parte 2",
          "Crear un programa que pueda registrar datos en arreglos y mostrarlos, preferiblemente que contenga un menu",
          fecha,
          20,
          materias[2],
          callback
        );
      },
      function (callback) {
        const fecha = new Date(2021, 05, 13);
        createActividad(
          "PHP - Parte 1",
          "Crear una pagina basica de inicio para el proyecto de este semestre",
          fecha,
          20,
          materias[3],
          callback
        );
      },
      function (callback) {
        const fecha = new Date(2021, 05, 13);
        createActividad(
          "PHP - Parte 2",
          "Crear una pagina basica de registro de usuario para el proyecto de este semestre",
          fecha,
          20,
          materias[3],
          callback
        );
      },
      function (callback) {
        const fecha = new Date(2021, 05, 13);
        createActividad(
          "JavaScript - Parte 1",
          "Realice operaciones con arreglos y funciones para resolver las operaciones que se encuentran en el archivo de clases",
          fecha,
          20,
          materias[4],
          callback
        );
      },
      function (callback) {
        const fecha = new Date(2021, 05, 13);
        createActividad(
          "JavaScript - Parte 2",
          "Realice una pagina de registro y guarde los datos en un objeto",
          fecha,
          20,
          materias[4],
          callback
        );
      },
    ],
    cb
  );
}

function crearNotas(cb) {
  async.parallel(
    [
      function (callback) {
        createNota(12, actividades[0], usuarios[3], callback);
      },
      function (callback) {
        createNota(15, actividades[0], usuarios[5], callback);
      },
      function (callback) {
        createNota(6, actividades[0], usuarios[7], callback);
      },
      function (callback) {
        createNota(18, actividades[2], usuarios[4], callback);
      },
      function (callback) {
        createNota(11, actividades[2], usuarios[9], callback);
      },
      function (callback) {
        createNota(4, actividades[4], usuarios[6], callback);
      },
      function (callback) {
        createNota(19, actividades[4], usuarios[9], callback);
      },
      function (callback) {
        createNota(11, actividades[6], usuarios[3], callback);
      },
      function (callback) {
        createNota(16, actividades[6], usuarios[6], callback);
      },
      function (callback) {
        createNota(8, actividades[6], usuarios[8], callback);
      },
      function (callback) {
        createNota(20, actividades[8], usuarios[4], callback);
      },
      function (callback) {
        createNota(15, actividades[8], usuarios[5], callback);
      },
      function (callback) {
        createNota(12, actividades[8], usuarios[9], callback);
      },
    ],
    cb
  );
}

function crearArchivos(cb) {
  async.parallel(
    [
      function (callback) {
        const nombre = `${uuid()}-actividad 1.zip`;
        createArchivo(nombre, usuarios[3], actividades[0], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-hola mundo.zip`;
        createArchivo(nombre, usuarios[5], actividades[0], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-actividad.zip`;
        createArchivo(nombre, usuarios[7], actividades[0], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-actividad 1.zip`;
        createArchivo(nombre, usuarios[4], actividades[2], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-arreglos.zip`;
        createArchivo(nombre, usuarios[9], actividades[2], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-actividad.zip`;
        createArchivo(nombre, usuarios[6], actividades[4], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-actividad-1.zip`;
        createArchivo(nombre, usuarios[8], actividades[4], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-actividad 1.zip`;
        createArchivo(nombre, usuarios[3], actividades[6], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-actividad-1.zip`;
        createArchivo(nombre, usuarios[6], actividades[6], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-actividad 1.zip`;
        createArchivo(nombre, usuarios[8], actividades[6], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-ejercicios a realizar.zip`;
        createArchivo(nombre, usuarios[2], actividades[8], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-javascript.zip`;
        createArchivo(nombre, usuarios[4], actividades[8], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-actividad.zip`;
        createArchivo(nombre, usuarios[5], actividades[8], callback);
      },
      function (callback) {
        const nombre = `${uuid()}-actividadJS.zip`;
        createArchivo(nombre, usuarios[9], actividades[8], callback);
      },
    ],
    cb
  );
}

async.series(
  [crearUsuarios, crearMaterias, crearActividades, crearNotas, crearArchivos],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Stuff: " + notas);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
