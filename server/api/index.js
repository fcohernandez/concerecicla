const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const comentario = require('./routes/comentario')
const usuario = require('./routes/usuario')
const material = require('./routes/material')
const puntoLimpio = require('./routes/puntoLimpio')
const recicla = require('./routes/recicla')
const register = require('./routes/register')
const login = require('./routes/login')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/comentario', comentario)
app.use('/usuario', usuario)
app.use('/material', material)
app.use('/puntolimpio', puntoLimpio)
app.use('/recicla', recicla)
app.use('/register', register)
app.use('/login', login)

mongoose.connect('mongodb://localhost/concerecicla', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("conexion exitosa")
});

app.listen(3000, () => {
    console.log("escuchando puerto 3000")
})

