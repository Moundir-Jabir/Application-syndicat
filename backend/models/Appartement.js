const mongoose = require('mongoose')

const appartementSchema = new mongoose.Schema({
    numero: {
        type: Number,
        required: true,
        unique: true
    },
    proprietaire: {
        type: String,
        required: true
    },
    dernier_payment: {
        type: Date,
        default: new Date()
    },
    cotisation: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Appartement', appartementSchema)