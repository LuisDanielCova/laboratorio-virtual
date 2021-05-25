let Profesor = require('../models/Profesor');
const { body,validationResult } = require('express-validator');

// Mostrar todos los profesores

exports.lista_profesores = function(req, res, next){
    Profesor.find()
        .sort([['apellido', 'ascending']])
        .exec(function(err, lista_profesores){
            if(err) {return next(err);}
            // No hubo error por lo tanto se hace render
            res.render('profesores', {titulo: 'Lista de profesores', lista_profesores});
        });
};