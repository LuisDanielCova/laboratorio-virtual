let express = require("express");
let router = express.Router();
const multer = require("multer");
const upload = multer();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Modulo de las materias
const materiaController = require("../controllers/materiaController");
const actividadController = require("../controllers/actividadController");

// RUTAS DE LAS MATERIAS //

router.get("/", materiaController.conseguir_lista);
router.get("/:id", materiaController.mostrar_materia);
router.post("/crear", validateToken, materiaController.crear_materia);
router.get("/crear/:id", materiaController.actualizar_materia_get);
router.put("/crear/:id", materiaController.actualizar_materia_put);
router.delete("/borrar/:id", materiaController.borrar_materia);
router.get("/profesor/:id", materiaController.conseguir_materias_profesor);
router.get("/estudiante/:id", materiaController.conseguir_materias_estudiante);
router.put(
  "/inscribir/:idMateria/:idEstudiante",
  materiaController.inscribir_estudiante
);

// RUTAS DE LAS ACTIVIDADES //

router.get("/:idMateria/actividades/", actividadController.conseguir_lista);

router.get(
  "/:idMateria/actividades/:id",
  actividadController.mostrar_actividad
);

router.post(
  "/:idMateria/actividad/crear/:idProfesor",
  upload.single("file"),
  actividadController.crear_actividad
);

router.get(
  "/:idMateria/actividad/crear/:id",
  actividadController.actualizar_actividad_get
);

router.put(
  "/:idMateria/actividad/crear/:id",
  actividadController.actualizar_actividad_put
);

router.delete("/actividades/borrar/:id", actividadController.borrar_actividad);

module.exports = router;
