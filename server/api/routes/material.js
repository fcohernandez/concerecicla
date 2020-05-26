const express = require('express')
const Material = require('../models/material')

const app = express()

app.get('/material', (req, res) => {
    
    Material.find({})
        .exec((err, materiales) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                materiales
            })
        })

})

app.post('/material', (req, res) => {
    let body = req.body

    let material = new Material({
        nombre: body.nombre,
        id: body.id
    })

    material.save( (err, materialDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            material: materialDB
        })
    })

})

app.put('/material/:id', (req, res) => {
    
    let id = req.params.id
    let body = req.body

    Material.findByIdAndUpdate(id, body, {new: true}, (err, materialDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            material: materialDB
        })
    })

})

app.delete('/material/:id', (req, res) => {
    
    let id = req.params.id

    Material.findByIdAndRemove(id, (err, materialBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            material: materialBorrado
        })
    })

})

module.exports = app;