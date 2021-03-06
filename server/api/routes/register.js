const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const router = express.Router()


router.post('/', (req, res) => {
    let body = req.body
    let email = req.body.email

    let usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        admin: body.admin,
        edad: body.edad
    })

    Usuario.findOne( {email}, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(usuarioDB){
            return res.json({
                ok: true,
                msg: 'El correo electrónico ya está en uso'
            })
        }

        usuario.save( (err, userDB) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    msg: 'Error al crear usuario',
                    err
                })
            }
            console.log('usuario registrado', userDB)
            const token = jwt.sign({userDB}, 'conceReciclaApp', {
                expiresIn: 60*60*24*30
            });

            console.log('token',token)
    
            return res.json({
                ok: true,
                msg: 'Usuario creado con éxito',
                token,
                usuarioDB: userDB
            })
        })

    })

})



module.exports = router