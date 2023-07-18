const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (request, res = response, next)=>{

    // Manejo de errores
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: true,
            errors: errors.mapped(),
        })
    }

    next();
}

module.exports={
    validarCampos
}