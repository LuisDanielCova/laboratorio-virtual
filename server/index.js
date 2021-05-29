require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { DateTime } = require("luxon");

let routerUsuarios = require("./routes/usuarios");

app.use(express.json());
app.use(cors());

app.locals._id = "stufflmao";

const mongoDB = `${process.env.DB_URL}`;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/usuarios", routerUsuarios);

// Atrapar el error y mandarlo al manejador de errores
app.use(function (req, res, next) {
  next(createError(404));
});

// Manejador de errores
app.use(function (err, req, res, next) {
  // Muestra el mensaje solo al entorno de desarrolladores
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(3001, () => {
  console.log(`Servidor en ejecucion en el puerto 3001`);
});
