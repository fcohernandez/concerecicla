const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let materialSchema = new Schema({
    id: {
        type: String,
        required: [true, 'Es necesario un identificador']
    },
    nombre: {
        type: String,
        required: [true, 'Es necesario ingresar un nombre']
    }
})

module.exports = mongoose.model('Material', materialSchema);