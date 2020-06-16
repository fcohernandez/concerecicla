const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let puntoLimpioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    puntuacion: {
        type: Number,
        required: false,
        default: 0
    },
    descripcion: {
        type: String,
        required: [true, 'Por favor ingrese una descripción']
    },
    materiales: [
        {type: String, ref: 'Material'}
    ],
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    totalPuntuaciones: {
      type: Number,
      required: false,
      default: 0
    },
    puntuacionPromedio: {
      type: Number,
      required: false,
      default: 0
    }
})

puntoLimpioSchema.index({location: "2dsphere"})

module.exports = mongoose.model('PuntoLimpio', puntoLimpioSchema)