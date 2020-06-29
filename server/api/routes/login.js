const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('734561156669-mgt5c0fli3kekckcqanmpvglq7moeqil.apps.googleusercontent.com');

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
                msg: 'Usuario y/o contraseña incorrectos'
            })
        }

        if(bcrypt.compareSync(password, usuarioDB.password) && email === usuarioDB.email){

            const token = jwt.sign({usuarioDB}, 'conceReciclaApp', {
                expiresIn: 60*60*24*30
            });

            return res.json({
                ok: true,
                msg: 'Login exitoso!',
                token,
                usuarioDB
            })
        }

        return res.json({
            ok: false,
            msg: 'Usuario y/o contraseña incorrectos'
        })

    })
})

const verify = async(token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '734561156669-9nbm9s134flktjil540qf7osqm1ig7km.apps.googleusercontent.com'
    })

    const payload = ticket.getPayload()

    return({
        nombre: payload.given_name,
        email: payload.email,
        apellido: payload.family_name
    })
}

router.post('/google', async(req, res) => {

    let token = req.body.googleToken

    let googleUser = await verify(token)

    Usuario.findOne( {email: googleUser.email}, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(usuarioDB){

            if(usuarioDB.google === false){
                return res.status(400).json({
                    ok: false,
                    err,
                    msg: 'Debe usar autenticación normal'
                })
            }else{
                const token = jwt.sign({usuarioDB}, 'conceReciclaApp', {
                    expiresIn: 60*60*24*30
                });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }

        }else{
            
            let usuario = new Usuario({
                nombre : googleUser.nombre,
                apellido : googleUser.apellido,
                email : googleUser.email,
                google: true,
                password: 'xd'
            })

            usuario.save((err, usuarioDB) => {

                if(err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                const token = jwt.sign({usuarioDB}, 'conceReciclaApp', {
                    expiresIn: 60*60*24*30
                });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })

            })

        }

    })

})

router.post('/facebook', (req, res) => {

    let facebookUser = req.body.facebookUser

    Usuario.findOne( {email: facebookUser.email}, (err, usuarioDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if(usuarioDB){

            if(usuarioDB.facebook === false){
                return res.status(400).json({
                    ok: false,
                    err,
                    msg: 'Debe usar autenticación normal'
                })
            }else{
                const token = jwt.sign({usuarioDB}, 'conceReciclaApp', {
                    expiresIn: 60*60*24*30
                });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }

        }else{
            
            let usuario = new Usuario({
                nombre : facebookUser.nombre,
                apellido : facebookUser.apellido,
                email : facebookUser.email,
                facebook: true,
                password: 'xd'
            })

            console.log(usuario)
            usuario.save((err, usuarioDB) => {

                if(err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                const token = jwt.sign({usuarioDB}, 'conceReciclaApp', {
                    expiresIn: 60*60*24*30
                });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })

            })

        }

    })

})


module.exports = router;