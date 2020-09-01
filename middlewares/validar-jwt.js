const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario')
const response = require('../response/response');

const validarRole = async (req, res, next) => {
    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return response.error(req, res, 'Usuario no existe', 404)
        }
        if(usuarioDB.role !== 'ADMIN_ROLE') {
            return response.error(req, res, 'No tiene privilegios para hacer esto', 403)
        }
        next();
    } catch (error) {
        console.log(error);
        return response.error(req, res, 'Hable con el administrador', 500)
    }
}

const validarRoleOMismoUsuario = async (req, res, next) => {
    const uid = req.uid;
    const id = req.params.uid

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return response.error(req, res, 'Usuario no existe', 404)
        }
        if(usuarioDB.role !== 'ADMIN_ROLE' && uid !== id) {
            return response.error(req, res, 'No tiene privilegios para hacer esto', 403)
        }
        next();
    } catch (error) {
        console.log(error);
        return response.error(req, res, 'Hable con el administrador', 500)
    }
}

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
    validarJWT,
    validarRole,
    validarRoleOMismoUsuario
}