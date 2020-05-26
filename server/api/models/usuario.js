const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    email: {
        type: String,
        required: [true, 'Es necesario un correo']
    },
    password: {
        type: String,
        required: [true, 'Es necesaria una contraseña']
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);