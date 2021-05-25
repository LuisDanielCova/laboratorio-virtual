let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PersonaSchema = Schema(
    {
        cedula: {type: Number, required: true, min: 8},
        nombre: {type: String, required: true, minLength: 3},
        apellido: {type: String, required: true, minLength: 3},
        fecha_nac: {type: Date, required: true},
        telefono: {type: String},
        correo: {type: String, required: true},
        usuario: {type: String, required: true},
        contrasena: {type: String, required: true}
    }
);

PersonaSchema
    .virtual('nombre')
    .get(function(){
        return `${this.apellido}, ${this.nombre}`
    });

PersonaSchema
    .virtual('fecha_nac_formato')
    .get(function(){
        return this.date_of_birth 
        ? this.date_of_birth.toISOString().slice(0, 10)  
        : '';
    });

module.exports = mongoose.model('Persona', PersonaSchema);