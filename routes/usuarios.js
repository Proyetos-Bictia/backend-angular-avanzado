/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');

const controller = require('../controllers/usuarios');
const response = require('../response/response');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, (req, res) => {
    controller.getUsuarios(req.query.desde || 0).then(data => {
        response.success(req, res, data, 200)
    }).catch(err => console.log(err))
})

router.post('/',
    [
        check('nombre', 'nombre es requerido').not().isEmpty(),
        check('password', 'password es requerido').not().isEmpty(),
        check('email', 'email no es valido').isEmail(),
        validarCampos,
    ],
    (req, res) => {
        controller.crearUsuario(req.body).then(data => {
            response.success(req, res, data, 201)
        }).catch(err => {
            response.error(req, res, err, 500)
        })
    })

router.put('/:uid',
    [
        validarJWT,
        check('nombre', 'nombre es requerido').not().isEmpty(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        check('email', 'email no es valido').isEmail(),
        validarCampos,
    ],
    (req, res) => {
        controller.actualizarUsuario(req.params.uid, req.body).then(data => {
            response.success(req, res, data, 200)
        }).catch(err => {
            response.error(req, res, err.msg, err.status)
        })
    })

router.delete('/:uid', validarJWT, (req, res) => {
    controller.borrarUsuario(req.params.uid).then(data => {
        response.success(req, res, data, 200)
    }).catch(err => {
        response.error(req, res, err.msg || err, err.status || 500)
    })
})

module.exports = router;