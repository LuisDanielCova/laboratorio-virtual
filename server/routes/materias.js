let express = require("express");
let router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();

// Modulo de las materias
const materiaController = require("../controllers/materiaController");
const actividadController = require("../controllers/actividadController");
const archivoController = require("../controllers/archivoController");

// Modelo del archivo
const FileModel = require("../models/Archivo");

// RUTAS DE LAS MATERIAS //

router.get("/", materiaController.conseguir_lista);
router.get("/:id", materiaController.mostrar_materia);
router.post("/crear", materiaController.crear_materia);
router.get("/crear/:id", materiaController.actualizar_materia_get);
router.put("/crear/:id", materiaController.actualizar_materia_put);
router.delete("/borrar/:id", materiaController.borrar_materia);

// RUTAS DE LAS ACTIVIDADES //

router.get("/:idMateria/actividades/", actividadController.conseguir_lista);

router.get(
  "/:idMateria/actividades/:id",
  actividadController.mostrar_actividad
);

router.post("/actividades/crear", actividadController.crear_actividad);

router.get(
  "/actividades/crear/:id",
  actividadController.actualizar_actividad_get
);

router.put(
  "/actividades/crear/:id",
  actividadController.actualizar_actividad_put
);

router.delete("/actividades/borrar/:id", actividadController.borrar_actividad);

// RUTAS DE LOS ARCHIVOS
router.get(
  "/actividades/:idActividad/archivos",
  archivoController.mostrar_archivos
);

router.post(
  "/actividades/:idActividad/archivos/subir",
  upload.single("file"),
  archivoController.subir_archivo
);

router.get(
  "/actividades/:idActividad/archivos/descargar/:name",
  archivoController.descargar_archivo
);

router.delete("/actividades/:idActividad/archivos/borrar/:name");

module.exports = router;
