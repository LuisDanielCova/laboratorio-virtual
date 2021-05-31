let express = require("express");
let router = express.Router();

// Modulo de las materias
const materia_controller = require("../controllers/materiaController");
const actividad_controller = require("../controllers/actividadController");

// RUTAS DE LAS MATERIAS //

router.post("/crear", materia_controller.crear_materia);

router.get("/", materia_controller.conseguir_lista);

router.get("/crear/:id", materia_controller.actualizar_materia_get);

router.put("/crear/:id", materia_controller.actualizar_materia_put);

router.delete("/borrar/:id", materia_controller.borrar_materia);

// RUTAS DE LAS ACTIVIDADES //

router.post("/actividades/crear", actividad_controller.crear_actividad);

router.get("/actividades/", actividad_controller.conseguir_lista);

router.get(
  "/actividades/crear/:id",
  actividad_controller.actualizar_actividad_get
);

router.put(
  "/actividades/crear/:id",
  actividad_controller.actualizar_actividad_put
);

router.delete("/actividades/borrar/:id", actividad_controller.borrar_actividad);

module.exports = router;
