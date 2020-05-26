const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let reciclaSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'Usuario'
    },
    materialId: [
        {type: Schema.Types.ObjectId, ref: 'PuntoLimpio'}
    ],
    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Recicla', reciclaSchema)