const express = require('express')
const Recicla = require('../models/recicla')
const isAuthenticated = require('../auth')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

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

router.get('/:token', (req, res) => {

    const {token} = req.params
    let id
    if(!token){
        return res.json({
            ok: true,
            msg: 'token invalido'
        })
    }

    jwt.verify(token, 'conceReciclaApp', (err, decoded) => {
        
        const { _id } = decoded.usuarioDB
        Usuario.findById({_id}, (err, usuario) => {
            Recicla.find({userId: usuario._id})
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
    })
    
    

})

router.post('/', isAuthenticated, (req, res) => {
    let body = req.body

    let recicla = new Recicla({
        userId: req.user._id,
        materiales: body.materiales
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