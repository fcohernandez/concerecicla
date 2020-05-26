const express = require('express')
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario')

const app = express()

app.get('/usuario', (req, res) => {
    
    Usuario.find({})
        .exec((err, usuarios) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                usuarios
            })
        })

})

app.post('/usuario', (req, res) => {
    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    })

    usuario.save( (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

app.put('/usuario/:id', (req, res) => {
    
    let id = req.params.id
    let body = req.body

    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

})

app.delete('/usuario/:id', (req, res) => {
    
    let id = req.params.id

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })

})

module.exports = app;