const { validationResult } = require('express-validator');

const responseCustom = require('../response/response');

const validarCampos = (req, res, next) => {

    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return responseCustom.error(req, res, errores.mapped(), 400)
    }
    next();

}

module.exports = {
    validarCampos
}