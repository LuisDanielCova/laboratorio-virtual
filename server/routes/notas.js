let express = require("express");
let router = express.Router();

// Modelo de las notas
const notaController = require("../controllers/notaController");
// Rutas de las notas
router.get("/", notaController.mostrar_notas);
router.get("/estudiante/:id", notaController.mostrar_notas_estudiante);
router.get("/:id", notaController.mostrar_nota);
router.post("/crear", notaController.crear_nota);
router.put("/actualizar/:id", notaController.actualizar_nota);
router.delete("/borrar/:id", notaController.borrar_nota);

module.exports = router;
