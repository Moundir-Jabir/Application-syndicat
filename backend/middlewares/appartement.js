const Joi = require('joi')
const Appartement = require("../models/Appartement")

exports.appValidator = (req, res, next) => {
    const schema = Joi.object({
        numero: Joi.number().required(),
        proprietaire: Joi.string().required().trim(),
        cotisation: Joi.number().required()
    })
    const { error } = schema.validate(req.body)
    if (error)
        return res.status(400).json({
            error: error.details[0].message
        })
    next()
}

exports.updateValidator = (req, res, next) => {
    req.check('proprietaire', 'Nom du propriétaire obligatoire').notEmpty()
    req.check('cotisation', 'Cotisation obligatoire').notEmpty().isNumeric().withMessage('Cotisation doit etre une somme valide')
    const errors = req.validationErrors()
    if (errors)
        return res.status(400).json({
            erreur: errors[0].msg
        })
    next()
}

exports.appartementById = (req, res, next, id) => {
    Appartement.findById(id).exec((err, appartement) => {
        if (err)
            return res.status(404).json({ err })
        req.appartement = appartement
        next()
    })
}