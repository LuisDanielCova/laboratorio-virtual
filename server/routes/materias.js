let express = require("express");
let router = express.Router();
const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();

// Modulo de las materias
const materia_controller = require("../controllers/materiaController");
const actividad_controller = require("../controllers/actividadController");

// Modelo del archivo
const FileModel = require("../models/Archivo");

// Modelo de las nota
const notaController = require("../controllers/notaController");
router.post("/nota/crear", notaController.crear_nota);

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

// RUTAS DE LOS ARCHIVOS

router.post(
  "/actividades/archivos/subir",
  upload.single("file"),
  async function (req, res, next) {
    const { file } = req;

    if (file.detectedFileExtension != ".zip") {
      next(new Error("Invalid file type"));
    }

    const fileName = `${uuid()}-${file.originalName}`;

    await pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/../public/files/${fileName}`)
    );

    const fileDB = new FileModel({
      nombre: fileName,
    });

    await fileDB.save();

    res.status(200).send(`File uploaded as ${fileName}`);
  }
);

router.get(
  "/actividades/archivos/descargar/:name",
  async function (req, res, next) {
    const file = `${__dirname}/../public/files/${req.params.name}`;

    fs.access(file, fs.constants.F_OK, (err) => {
      console.log(`${file} ${err ? "does not exist" : "exists"}`);
    });

    fs.readFile(file, function (err, content) {
      if (err) {
        res.status(204).json({ message: "No such file" });
      } else {
        const fileS = fs.createReadStream(file);
        res.download(file, (err) => {
          if (err) {
            res
              .status(500)
              .send({ message: "File cannot be downloaded: " + err });
          }
        });
      }
    });
  }
);
module.exports = router;
