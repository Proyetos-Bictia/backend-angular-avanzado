/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const expressFileUpload = require('express-fileupload');

const controller = require('../controllers/uploads');
const response = require('../response/response');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload())

router.put('/:tipo/:id',
    [
        validarJWT,
    ],
    (req, res) => {
        controller.fileUpload(req.params.tipo, req.params.id, req.files).then(data => {
            response.success(req, res, data, 200)
        }).catch(err => {
            response.error(req, res, err.msg, err.status)
        })
    })

module.exports = router;