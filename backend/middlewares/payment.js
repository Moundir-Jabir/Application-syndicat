const Payment = require("../models/Payment")

exports.paymentValidator = (req, res, next) => {
    req.check('nbr_mois', 'Choisir le nombre de mois souhaitant payés').notEmpty().isNumeric().withMessage('entrer un nombre positif')
    req.check('moyen_payment', 'Moyen Payment obligatoire').notEmpty()
    const errors = req.validationErrors()
    if (errors)
        return res.status(400).json({
            erreur: errors[0].msg
        })
    if (req.body.nbr_mois <= 0)
        return res.status(400).json({
            erreur: "entrer un nombre de mois positif"
        })
    next()
}

exports.paymentById = (req, res, next, id) => {
    Payment.findById(id).exec((err, payment) => {
        if (err)
            return res.status(404).json({ err })
        req.payment = payment
        next()
    })
}