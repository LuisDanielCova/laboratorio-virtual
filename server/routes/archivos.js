let express = require("express");
let router = express.Router();
const multer = require("multer");
const upload = multer();

const archivoController = require("../controllers/archivoController");

// RUTAS DE LOS ARCHIVOS
router.get(
  "/:idMateria/actividades/:idActividad/",
  archivoController.mostrar_archivos
);

router.post(
  "/subir/:idActividad/:idUsuario/",
  upload.single("file"),
  archivoController.subir_archivo
);

router.get("/descargar/:nombre", archivoController.descargar_archivo);

router.delete("/:idMateria/actividades/:idActividad/archivos/borrar/:name");

module.exports = router;
