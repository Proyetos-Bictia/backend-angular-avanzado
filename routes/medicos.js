/**
 * Medicos
 * Ruta: /api/medicos
 */

const { Router } = require('express');
const { check } = require('express-validator');

const response = require('../response/response');
const controller = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router()

router.get('/', (req, res) => {
    controller.getMedicos().then(data => {
        response.success(req, res, data, 200)
    }).catch(err => console.log(err))
})

router.post('/', [
    validarJWT,
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('hospital', 'Hospital es obligatorio').not().isEmpty(),
    check('hospital', 'Id no es valido').isMongoId(),
    validarCampos,
], (req, res) => {
    controller.crearMedico(req.body, req.uid).then(data => {
        response.success(req, res, data, 201)
    }).catch(err => {
        response.error(req, res, err, 500)
    })
})

router.put('/:uid', (req, res) => {
    controller.actualizarMedico(req.params.uid, req.body).then(data => {
        response.success(req, res, data, 200)
    }).catch(err => {
        response.error(req, res, err.msg, err.status)
    })
})

router.delete('/:uid', (req, res) => {
    controller.borrarMedico(req.params.uid).then(data => {
        response.success(req, res, data, 200)
    }).catch(err => {
        response.error(req, res, err.msg || err, err.status || 500)
    })
})

module.exports = router