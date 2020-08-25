/**
 * Ruta: /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');

const response = require('../response/response');
const controller = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router()


router.get('/', (req, res) => {
    controller.getHospitales().then(data => {
        response.success(req, res, data, 200)
    }).catch(err => console.log(err))
})

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    (req, res) => {
        controller.crearHospital(req.body, req.uid).then(data => {
            response.success(req, res, data, 201)
        }).catch(err => {
            response.error(req, res, err, 500)
        })
    })

router.put('/:uid',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos,
    ]
    , (req, res) => {
        controller.actualizarHospital(req.params.uid, req.body.nombre, req.uid).then(data => {
            response.success(req, res, data, 200)
        }).catch(err => {
            response.error(req, res, err.msg || err, err.status || 500)
        })
    })

router.delete('/:uid',
    validarJWT,
    (req, res) => {
        controller.borrarHospital(req.params.uid).then(data => {
            response.success(req, res, data, 200)
        }).catch(err => {
            response.error(req, res, err.msg || err, err.status || 500)
        })
    })

module.exports = router