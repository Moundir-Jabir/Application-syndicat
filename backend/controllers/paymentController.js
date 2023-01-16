const Payment = require('../models/Payment')
const pdf = require('html-pdf-phantomjs-included');
const { template } = require('../config/template_facture')

exports.addPayment = (req, res) => {
    let nbr_mois = req.body.nbr_mois
    let mois = []
    let dernier_payment = req.appartement.dernier_payment
    for (let i = 0; i < nbr_mois; i++) {
        let m = new Date(dernier_payment)
        m.setMonth(m.getMonth() + i + 1)
        mois.push(m)
    }
    req.body.mois = mois
    req.body.appartement = req.appartement._id
    req.appartement.dernier_payment = mois[nbr_mois - 1]
    req.appartement.save(async (err, app) => {
        if (err)
            return res.status(400).json({
                erreur: 'Payment non ajouté'
            })
        pdf.create(template({ app, payment: req.body }), { "localUrlAccess": true }).toBuffer(function (err, buffer) {
            if (err)
                console.log(err);
            req.body.facture = { data: buffer, contentType: "application/pdf" }
            let payment = new Payment(req.body)
            payment.save((err, payment) => {
                if (err)
                    return res.status(400).json({
                        erreur: err
                    })
                payment.facture = undefined
                return res.json({
                    app, payment
                })
            })
        });
    })
}

exports.getPayment = (req, res) => {
    Payment.find({ appartement: req.appartement._id }).select('-facture').exec((err, payments) => {
        if(err)
            return res.status(400).json({
                erreur: "Can't get appartments"
            })
        return res.json({
            payments
        })
    })
}

exports.getFacture = (req, res) => {
    const { data, contentType } = req.payment.facture
    if (data) {
        res.set('Content-Type', contentType)
        return res.send(data)
    }
}