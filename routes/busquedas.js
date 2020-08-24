/**
 * Busqueda en todas las colecciones
 * ruta: api/todo/:busqueda
 */

const { Router } = require('express');

const response = require('../response/response');
const controller = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt')

const router = Router();

router.get('/:busqueda', [
    validarJWT,
],
    (req, res) => {
        controller.getTodo(req.params.busqueda).then(data => {
            response.success(req, res, data, 200)
        }).catch(err => {
            response.error(req, res, err.msg || err, err.status || 500)
        })
    }
)

router.get('/coleccion/:tabla/:busqueda', [
    validarJWT,
],
    (req, res) => {
        console.log('entro');
        controller.getDocumentosColeccion(req.params.tabla, req.params.busqueda).then(data => {
            response.success(req, res, data, 200)
        }).catch(err => {
            response.error(req, res, err.msg || err, err.status || 500)
        })
    }
)


module.exports = router