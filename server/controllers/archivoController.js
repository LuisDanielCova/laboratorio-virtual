const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const FileModel = require("../models/Archivo");
const upload = multer();

exports.mostrar_archivos = async (req, res, next) => {
  FileModel.find({ actividad: req.params.idActividad })
    .populate({
      path: "actividad",
      select: "nombre",
      populate: {
        path: "materia",
        select: "nombre",
      },
    })
    .populate("usuario", "nombre apellido cedula cargo")
    .exec((err, archivos) => {
      if (err) return next(err);
      res.status(200).json({ archivos });
    });
};

exports.subir_archivo = async (req, res, next) => {
  const {
    file,
    params: { idActividad, idUsuario },
  } = req;

  if (file.detectedFileExtension != ".zip") {
    next(new Error("Tipo de archivo invalido"));
  }

  const fileName = `${uuid()}-${file.originalName}`;

  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/../public/files/${fileName}`)
  );

  const fileDB = new FileModel({
    nombre: fileName,
    usuario: idUsuario,
    actividad: idActividad,
  });

  await fileDB.save();

  res.status(200).send(`Se subio el archivo como ${fileName}`);
};

exports.descargar_archivo = async (req, res, next) => {
  const file = `${__dirname}/../public/files/${req.params.nombre}`;

  fs.access(file, fs.constants.F_OK, (err) => {
    console.log(`${file} ${err ? "no existe" : "existe"}`);
  });

  fs.readFile(file, function (err, content) {
    if (err) {
      res.status(204).json({ message: "No existe el archivo" });
    } else {
      res.download(file, (err) => {
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
  const file = await FileModel.findById(req.params.idArchivo);
  if (file) {
    await file.deleteOne();
    const filePath = `${__dirname}/../public/files/${file.nombre}`;
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
  }
};
