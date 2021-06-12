const multer = require("multer");
const uuid = require("uuid").v4;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const FileModelEstudiante = require("../models/Archivo");
const upload = multer();

exports.subir_archivo_profesor = async (req, res, next) => {
  const {
    file,
    body: { nombre },
  } = req;

  if (file.detectedFileExtension != ".zip") {
    next(new Error("Invalid file type"));
  }

  const fileName = `${uuid()}-${file.originalName}`;

  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/../public/files/${fileName}`)
  );

  const fileDB = new FileModelProfesor({
    nombre: fileName,
    url: `${__dirname}/../public/files/${fileName}`,
  });

  await fileDB.save();

  res.status(200).send(`File uploaded as ${fileName}`);
};

exports.subir_archivo_estudiante = async (req, res, next) => {
  const {
    file,
    body: { nombre },
  } = req;

  if (file.detectedFileExtension != ".zip") {
    next(new Error("Invalid file type"));
  }

  const fileName = `${uuid()}-${file.originalName}`;

  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/../public/files/${fileName}`)
  );

  const fileDB = new FileModelEstudiante({
    nombre: fileName,
    url: `${__dirname}/../public/files/${fileName}`,
  });

  await fileDB.save();

  res.status(200).send(`File uploaded as ${fileName}`);
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
      res.download(file, (err) => {
        if (err) {
          res
            .status(500)
            .send({ message: "File cannot be downloaded: " + err });
        }
      });
    }
  });
};
