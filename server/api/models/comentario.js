const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let comentarioSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'Usuario',
        required: [true, 'Ingrese un usuario valido']
    },
    puntoId: {
        type: Schema.Types.ObjectId, ref: 'PuntoLimpio',
        required: [true, 'Ingrese un punto valido']
    },
    userName: {
        type: String,
        required: [true, 'Ingrese un nombre']
    },
    userLastName: {
        type: String,
        required: [true, 'Ingrese un apellido']
    },
    descripcion: {
        type: String,
        required: [true, 'Ingrese una descripción']
    },
    puntuacion: {
        type: Number,
        required: [true, 'Ingrese una puntuación']
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Comentario', comentarioSchema)