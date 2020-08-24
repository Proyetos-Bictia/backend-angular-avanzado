const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async (user) => {

    const { email, password } = user

    try {
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return Promise.reject({ status: 404, msg: 'Email no encontrado' })
        }

        //Verificar password con email
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return Promise.reject({ status: 400, msg: 'Email y contraseña no coinciden' })
        }

        //Generar el token
        const token = await generarJWT(usuarioDB.id);
        return token
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    login
}