/**
 * Ruta: /api/login
 */
const { Router } = require('express');
const { check } = require('express-validator');

const response = require('../response/response');
const controller = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    check('email', 'Email invalido').isEmail(),
    check('password', 'Passwrod es requerido').not().isEmpty(),
    validarCampos
],
    (req, res) => {
        controller.login(req.body).then(data => {
            response.success(req, res, data, 200)
        }).catch(err => {
            response.error(req, res, err.msg || err, err.status || 500)
        })
    }
)

router.post('/google', [
    check('token', 'Token de google es obligatorio').not().isEmpty(),
    validarCampos
],
    (req, res) => {
        controller.googleSignIn(req.body.token).then(data => {
            response.success(req, res, data, 200)
        }).catch(err => {
            response.error(req, res, err.msg || err, err.status || 500)
        })
    }
)

router.get('/renew', [
    validarJWT
],
    (req, res) => {
        controller.renewToken(req.uid).then(data => {
            response.success(req, res, data, 200)
        }).catch(err => {
            response.error(req, res, err.msg || err, err.status || 500)
        })
    }
)


module.exports = router