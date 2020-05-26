const express = require('express')
const PuntoLimpio = require('../models/puntoLimpio')

const app = express()

app.get('/puntos', (req, res) => {
    
    PuntoLimpio.find({})
        .exec((err, puntos) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                puntos
            })
        })

})

app.post('/puntos', (req, res) => {
    let body = req.body

    let puntoLimpio = new PuntoLimpio({
        nombre: body.nombre,
        descripcion: body.descripcion,
        materiales: body.materiales,
        location: body.location
    })

    puntoLimpio.save( (err, puntoDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            punto: puntoDB
        })
    })

})

app.put('/puntos/:id', (req, res) => {
    
    let id = req.params.id
    let body = req.body

    PuntoLimpio.findByIdAndUpdate(id, body, {new: true}, (err, puntoDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            punto: puntoDB
        })
    })

})

app.delete('/puntos/:id', (req, res) => {
    
    let id = req.params.id

    PuntoLimpio.findByIdAndRemove(id, (err, puntoBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            punto: puntoBorrado
        })
    })

})

module.exports = app;