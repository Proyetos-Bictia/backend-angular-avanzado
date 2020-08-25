const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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
};

const googleSignIn = async (token) => {

    try {
        const { name, email, picture } = await googleVerify(token);
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            //no existe en la db
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            //existe en la db
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
        }

        //Guardar usuario en db
        await usuario.save();

        //Generar el token
        const tokenFinal = await generarJWT(usuario.id);

        return tokenFinal
    } catch (error) {
        console.log(error);
        return Promise.reject({ status: 401, msg: 'Token no es correcto' })
    }

}

const renewToken = async (uid) => {



    //Generar el token
    const tokenFinal = await generarJWT(uid);
    return tokenFinal
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}