const jwt = require('jsonwebtoken')

const response = require('../response/response');
const { json } = require('express');

const validarJWT = (req, res, next) => {

    //Leer el token
    const token = req.header('x-token');
    if (!token) {
        response.error(req, res, 'No hay token en la petición', 401)
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRETE);
        req.uid = uid;
        next()
    } catch (error) {
        return response.error(req, res, 'Token no valido', 401)
    }

}

module.exports = {
    validarJWT
}