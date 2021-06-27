const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

// Modelo del Usuario
const Usuario = require("../models/Usuario");

// Modulos de los controladores
const usuarioController = require("../controllers/usuarioController");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Inicio y cierre de sesion

router.post("/login", async (req, res, next) => {
  const { usuario, contrasena } = req.body;

  const user = await Usuario.findOne({ usuario: usuario }).exec();

  if (!user) return res.status(206).json({ error: "El usuario no existe" });

  const resultado = await bcrypt.compare(contrasena, user.contrasena);

  if (!resultado)
    return res.status(206).json({ error: "La contraseña es incorrecta" });

  const accessToken = sign(
    {
      usuario: user.usuario,
      cargo: user.cargo,
      id: user._id,
    },
    process.env.ACCESS_SECRET
  );

  res.json(accessToken);
});

router.get("/auth", validateToken, (req, res, next) => {
  res.json(req.usuario);
});

// RUTAS DE LOS USUARIOS //

router.get("/", usuarioController.conseguir_lista);

router.post("/crear", usuarioController.crear_usuario);

router.get("/profesores", usuarioController.conseguir_lista_profesores);

router.get("/:id", usuarioController.mostrar_usuario);

router.get("/actualizar/:id", usuarioController.actualizar_usuario_get);

router.put("/actualizar/:id", usuarioController.actualizar_usuario_put);

router.put(
  "/actualizar_contrasena/:id",
  usuarioController.actualizar_contrasena
);

router.delete("/borrar/:id", usuarioController.borrar_usuario);

module.exports = router;
