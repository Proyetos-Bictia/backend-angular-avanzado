const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async () => {
    const usuarios = await Usuario.find({}, 'nombre role email google');
    return usuarios
}

const crearUsuario = async ({ email, password, nombre }) => {

    const user = { email, password, nombre }
    const existEmail = await Usuario.findOne({ email });
    if (existEmail) {
        return Promise.reject('El correo ya existe')
    }

    const usuario = new Usuario(user);
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt)

    //Guardar usuario
    const usuarioDB = await usuario.save();
    const token = await generarJWT(usuarioDB._id);

    return { usuarioDB, token }
}

const actualizarUsuario = async (uid, dataUser) => {
    //TODO Validar token y comprobar si es el usuario correcto

    try {
        const usuarioDB = await Usuario.findById(uid)
        if (!usuarioDB) {
            return Promise.reject({ status: 404, msg: 'No existe un usuario por ese id' });
        }

        if (usuarioDB.email === dataUser.email) {
            delete dataUser.email
        } else {
            const existeEmail = await Usuario.findOne({ email: dataUser.email })
            if (existeEmail) {
                return Promise.reject({ status: 400, msg: 'Correo ya existe en la db' })
            }
        }

        //Actualización
        delete dataUser.password
        delete dataUser.google

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, dataUser, { new: true });
        return usuarioActualizado;
    } catch (error) {
        console.log(error);
        return Promise.reject(error)
    }
}

const borrarUsuario = async (uid) => {
    try {
        const usuarioDB = await Usuario.findById(uid)
        if (!usuarioDB) {
            return Promise.reject({ status: 404, msg: 'No existe un usuario por ese id' });
        }
        await Usuario.findByIdAndDelete(uid);
        return 'Usuario eliminado'
    } catch (error) {
        console.log(error);
        return Promise.reject({ status: 501, msg: 'Error inesperado hablar con admin' });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
}