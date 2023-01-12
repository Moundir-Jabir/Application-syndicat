const Appartement = require('../models/Appartement')

exports.addAppartement = (req, res) => {
    const appartement = new Appartement(req.body)
    appartement.save((err, app) => {
        if (err)
            return res.status(400).json({
                error: 'Appartement existe deja'
            })
        return res.send(app)
    })
}

exports.updateAppartement = (req, res) => {
    let appartement = req.appartement
    appartement.proprietaire = req.body.proprietaire
    appartement.cotisation = req.body.cotisation
    appartement.save((err, app) => {
        if (err)
            return res.status(400).json({
                erreur: 'Appartement non modifié'
            })
        return res.send(app)
    })
}

exports.allAppartement = (req, res) => {
    let condition = {}
    let num = req.query.numero ? req.query.numero : ""
    if (num != "")
        condition.numero = num
    Appartement.find(condition).exec((err, appartements) => {
        if (err)
            return res.status(500).json({
                erreur: err
            })
        return res.json({
            appartements
        })
    })
}