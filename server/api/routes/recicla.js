const express = require('express')
const Recicla = require('../models/recicla')
const isAuthenticated = require('../auth')

const router = express.Router()

router.get('/', (req, res) => {
    
    Recicla.find({})
        .exec((err, reciclajes) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                reciclajes
            })
        })

})

router.get('/:id', (req, res) => {

    let id = req.params.id
    
    Recicla.findById(id)
        .exec((err, reciclajes) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                reciclajes
            })
        })

})

router.post('/', isAuthenticated, (req, res) => {
    let body = req.body

    let recicla = new Recicla({
        userId: req.user._id,
        materialId: body.materialId
    })

    recicla.save( (err, reciclaDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            recicla: reciclaDB
        })
    })

})

router.put('/:id', (req, res) => {
    
    let id = req.params.id
    let body = req.body

    Recicla.findByIdAndUpdate(id, body, {new: true}, (err, reciclaDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            recicla: reciclaDB
        })
    })

})

router.delete('/:id', (req, res) => {
    
    let id = req.params.id

    MutationRecord.findByIdAndRemove(id, (err, reciclaBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            recicla: reciclaBorrado
        })
    })

})

module.exports = router