require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { DateTime } = require("luxon");

const AlumnoModel = require("./models/Alumno");

app.use(express.json());
app.use(cors());

const mongoDB = `mongodb://localhost:27017/test1`;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/insert", async (req, res) => {
  const alumno = new AlumnoModel({
    cedula: req.body.cedula,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecha_nac: req.body.fecha_nac,
    telefono: req.body.telefono,
    correo: req.body.correo,
    usuario: req.body.usuario,
    contrasena: req.body.contrasena,
  });

  try {
    await alumno.save();
    res.send({ "inserted data": "nice" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res, next) => {
  AlumnoModel.find({}, (err, results) => {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
});

app.get("/update/:id", async (req, res, next) => {
  AlumnoModel.findById(req.params.id, (err, results) => {
    if (err) {
      return next(err);
    }
    res.send(results);
  });
});

app.put("/update/:id", async (req, res, next) => {
  const alumno = new AlumnoModel({
    cedula: req.body.cedula,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecha_nac: req.body.fecha_nac,
    telefono: req.body.telefono,
    correo: req.body.correo,
    usuario: req.body.usuario,
    contrasena: req.body.contrasena,
    _id: req.params.id,
  });

  try {
    AlumnoModel.findByIdAndUpdate(
      req.params.id,
      alumno,
      {},
      function (err, elAlumno) {
        if (err) {
          return next(err);
        }
        res.send({ "updated data": elAlumno });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete/:id", async (req, res, next) => {
  await AlumnoModel.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
  });
  res.send(`Borrado`);
});

app.listen(3001, () => {
  console.log(`Servidor en ejecucion en el puerto 3001`);
});
