const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const router = express.Router()


router.post('/', (req, res) => {

    let {email, password} = req.body

    Usuario.findOne( {email}, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(!usuarioDB){
            return res.json({
                ok: false,
                msg: 'usuario y/o contraseña incorrecto'
            })
        }

        if(bcrypt.compareSync(password, usuarioDB.password) && email === usuarioDB.email){

            const token = jwt.sign({usuarioDB}, 'conceReciclaApp', {
                expiresIn: 1440
            });

            return res.json({
                ok: true,
                msg: 'login exitoso',
                token
            })
        }

        return res.json({
            ok: false,
            msg: 'usuario y/o contraseña incorrecto'
        })

    })
})



module.exports = router;