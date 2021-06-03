const { response } = require("express");
let express = require("express");
const passport = require("passport");
let router = express.Router();

// Modulos de los controladores
const alumno_controller = require("../controllers/alumnoController");
const profesor_controller = require("../controllers/profesorController");
const usuarioController = require("../controllers/usuarioController");

// RUTAS DE LOS ALUMNOS //

router.post("/alumno/crear", alumno_controller.crear_alumno);

router.get("/alumnos/", alumno_controller.conseguir_lista);

router.get("/alumno/actualizar/:id", alumno_controller.actualizar_alumno_get);

router.put("/alumno/actualizar/:id", alumno_controller.actualizar_alumno_put);

router.delete("/alumno/borrar/:id", alumno_controller.borrar_alumno);

// RUTAS DE LOS PROFESORES //

router.post("/profesor/crear", profesor_controller.crear_profesor);

router.get("/profesores/", profesor_controller.conseguir_lista);

router.get(
  "/profesor/actualizar/:id",
  profesor_controller.actualizar_profesor_get
);

router.put(
  "/profesor/actualizar/:id",
  profesor_controller.actualizar_profesor_put
);

router.delete("/profesor/borrar/:id", profesor_controller.borrar_profesor);

// RUTAS DE LOS USUARIOS //

router.post("/crear", usuarioController.crear_usuario);

router.get("/", usuarioController.conseguir_lista);

router.get("/actualizar/:id", usuarioController.actualizar_usuario_get);

router.put("/actualizar/:id", usuarioController.actualizar_usuario_put);

router.delete("/borrar/:id", usuarioController.borrar_usuario);

// Inicio y cierre de sesion

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(206).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).send({ message: "Successfully Authenticated", user });
      });
    }
  })(req, res, next);
});

router.get("/sesion", (req, res) => {
  res.status(200).send(req.user);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    res.send("Logged out");
  });
});

// LOGIN DE LOS USUARIOS

module.exports = router;
