const express = require('express')
const Comentario = require('../models/comentario')
const Punto = require('../models/puntoLimpio')

const isAuthenticated = require('../auth')

const router = express.Router()

router.get('/', (req, res) => {

    Comentario.find({})
        .exec((err, comentarios) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                comentarios
            })
        })

})

router.get('/:id', (req, res) => {

    let id = req.params.id

    Comentario.find({puntoId: id})
        .exec((err, comentarios) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                comentarios
            })
        })

})

router.post('/', isAuthenticated, (req, res) => {
    let body = req.body

    let comentario = new Comentario({
        userId: req.user._id,
        puntoId: body.puntoId,
        descripcion: body.descripcion,
        userName: req.user.nombre,
        userLastName: req.user.apellido,
        puntuacion: body.puntuacion
    })

    console.log(body)

    comentario.save( (err, comentarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            comentario: comentarioDB
        })
    })

})

router.put('/:id', (req, res) => {
    
    let id = req.params.id
    let body = req.body

    Comentario.findByIdAndUpdate(id, body, {new: true}, (err, comentarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            comentario: comentarioDB
        })
    })

})

router.delete('/:id', (req, res) => {
    
    let id = req.params.id

    Comentario.findByIdAndRemove(id, (err, comentarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            comentario: comentarioBorrado
        })
    })

})

module.exports = router;