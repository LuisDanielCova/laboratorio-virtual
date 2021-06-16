let express = require("express");
const passport = require("passport");
let router = express.Router();

// Modulos de los controladores
const usuarioController = require("../controllers/usuarioController");

// RUTAS DE LOS USUARIOS //

router.post("/crear", usuarioController.crear_usuario);

router.get("/", usuarioController.conseguir_lista);

router.get("/:id", usuarioController.mostrar_usuario);

router.get("/actualizar/:id", usuarioController.actualizar_usuario_get);

router.put("/actualizar/:id", usuarioController.actualizar_usuario_put);

router.put(
  "/actualizar_contrasena/:id",
  usuarioController.actualizar_contrasena
);

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
