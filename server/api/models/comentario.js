const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let comentarioSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'Material'
    },
    puntoId: {
        type: Schema.Types.ObjectId, ref: 'PuntoLimpio'
    },
    descripcion: {
        type: String,
        required: [true, 'Ingrese una descripción']
    }
})

module.exports = mongoose.model('Comentario', comentarioSchema)