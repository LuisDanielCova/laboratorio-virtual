let express = require("express");
let router = express.Router();

// Modulos de los controladores
let alumno_controller = require("../controllers/alumnoController");
let profesor_controller = require("../controllers/profesorController");

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

module.exports = router;
