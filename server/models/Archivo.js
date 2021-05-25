let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ArchivoSchema = Schema(
    {
        nombre: {type: String, required: true},
        alumno: {type: Schema.Types.ObjectId, ref: 'Alumno', required: true}
    }
);

ArchivoSchema
    .virtual('url')
    .get(function(){
        return `/archivo/${this.id}`;
    });

module.exports = mongoose.model('Archivo', ArchivoSchema);