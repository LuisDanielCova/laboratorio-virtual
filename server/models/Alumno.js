let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let AlumnoSchema = Schema(
    {
        persona: {type: Schema.Types.ObjectId, ref: 'Persona', required: true},
        notas: [{type: Number}],
    }
);

AlumnoSchema
    .virtual('url')
    .get(function(){
        return `/cuenta/${this._id}`;
    })