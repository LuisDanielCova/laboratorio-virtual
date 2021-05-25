let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let EmpleadoSchema = (
    {
        persona: {type: Schema.Types.ObjectId, ref: 'Persona', required: true},
        cargo: {type: String, required: true},
    }
);

EmpleadoSchema
    .virtual('url')
    .get(function(){
        return `/cuenta/${this._id}`;
    });

module.exports = mongoose.model('Profesor', EmpleadoSchema);