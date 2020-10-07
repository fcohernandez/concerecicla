const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

module.exports = (req, res, next) => {
    const {token} = req.body
    console.log(req.body)
    if(!token){
        return res.json({
            ok: true,
            msg: 'token invalido'
        })
    }

    jwt.verify(token, 'conceReciclaApp', (err, decoded) => {
        console.log('decodedasda', decoded)
        const { _id } = decoded.usuarioDB || decoded.userDB
        Usuario.findById({_id}, (err, usuario) => {
            req.user = usuario
            next()
        })

        
    })
}