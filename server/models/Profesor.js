let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ProfesorSchema = Schema(
    {
        cedula: {type: Number, required: true, min: 8},  //Cedula
        nombre: {type: String, required: true, minLength: 3},
        apellido: {type: String, required: true, minLength: 3},
        fecha_nac: {type: Date, required: true},
        telefono: {type: String},
        correo: {type: String, required: true},
        usuario: {type: String, required: true},
        contrasena: {type: String, required: true},
        cargo: {type: String, required: true},
    }
);

ProfesorSchema
    .virtual('nombre_completo')
    .get(function(){
        return `${this.apellido}, ${this.nombre}`
    });

ProfesorSchema
    .virtual('fecha_nac_formato')
    .get(function(){
        return this.date_of_birth 
        ? this.date_of_birth.toISOString().slice(0, 10)  
        : '';
    });

ProfesorSchema
    .virtual('url')
    .get(function(){
        return `/cuenta/${this._id}`;
    });

module.exports = mongoose.model('Profesor', ProfesorSchema);