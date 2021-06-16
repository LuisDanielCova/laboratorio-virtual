const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const FileModel = require("../models/Archivo");
const upload = multer();

exports.subir_archivo = async (req, res, next) => {
  const {
    file,
    body: { actividad, usuario },
  } = req;

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
    usuario: usuario,
    actividad: actividad,
  });

  await fileDB.save();

  res.status(200).send(`Se subio el archivo como ${fileName}`);
};

exports.descargar_archivo = async (req, res, next) => {
  const file = `${__dirname}/../public/files/${req.params.nombre}`;

  fs.access(file, fs.constants.F_OK, (err) => {
    console.log(`${file} ${err ? "does not exist" : "exists"}`);
  });

  fs.readFile(file, function (err, content) {
    if (err) {
      res.status(204).json({ message: "No such file" });
    } else {
      const fileS = fs.createReadStream(file);
      // Antes era file xd
      res.download(fileS, (err) => {
        if (err) {
          res
            .status(204)
            .send({ message: "El archivo no puede ser descargado: " + err });
        }
      });
    }
  });
};

exports.borrar_archivo = async (req, res, next) => {
  const filePath = `${__dirname}/../public/files/${req.params.nombre}`;
  fs.unlink(filePath, (err) => {
    if (err) {
      res
        .status(206)
        .json({ mensaje: "Error al borrar el archivo, intente nuevamente" });
      next(err);
    } else {
      res.status(200).json({ mensaje: "Archivo borrado correctamente" });
    }
  });
};
