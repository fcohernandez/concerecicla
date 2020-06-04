const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reciclaSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    materiales: [
        {
            material: {type: String, ref: 'PuntoLimpio'},
            cantidad: {type: Number }
        }
    ],
    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Recicla', reciclaSchema)