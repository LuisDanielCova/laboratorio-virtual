// Declaracion de variables
require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routerUsuarios = require("./routes/usuarios");
const routerMaterias = require("./routes/materias");
const routerNotas = require("./routes/notas");

// Database Connection
const mongoDB = `${process.env.DB_URL}`;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_SERVER_URL,
    credentials: true,
  })
);
app.use(
  session({
    secret: "XDDDDD",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser("XDDDDD"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Rutas
app.use("/usuarios", routerUsuarios);
app.use("/materias", routerMaterias);
app.use("/notas", routerNotas);

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
