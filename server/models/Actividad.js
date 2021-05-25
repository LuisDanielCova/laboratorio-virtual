let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ActividadSchema = Schema(
    {
        nombre: {type: String, required: true},
        descripcion: {type: String, required: true},
        nota: {type: Number, required: true},
        materia: {type: Schema.Types.ObjectId, ref: 'Materia', required: true},
        archivos: [{type: Schema.Types.ObjectId, ref: 'Archivo'}],
    }
);

ActividadSchema
    .virtual('url')
    .get(function(){
        return `/actividad/${this._id}`;
    });

module.exports = mongoose.model('Actividad', ActividadSchema);