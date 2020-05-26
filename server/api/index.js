const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello world")
})

app.use( require('./routes/usuario') )
app.use( require('./routes/material') )
app.use( require('./routes/puntoLimpio') )

mongoose.connect('mongodb://localhost/concerecicla', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("conexion exitosa")
});

app.listen(3000, () => {
    console.log("escuchando puerto 3000")
})

