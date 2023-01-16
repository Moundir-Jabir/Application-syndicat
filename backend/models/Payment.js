const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const paymentSchema = new mongoose.Schema({
    mois: {
        type: [Date],
        required: true
    },
    moyen_payment: {
        type: String,
        enum: ["espece", "check", "virement"],
        required: true
    },
    facture: {
        data: Buffer,
        contentType: String
    },
    appartement: {
        type: ObjectId,
        ref: 'Appartement',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)