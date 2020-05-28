const express = require('express')
const PuntoLimpio = require('../models/puntoLimpio')

const router = express.Router()

router.get('/', (req, res) => {
    
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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
    
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

router.delete('/:id', (req, res) => {
    
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

module.exports = router