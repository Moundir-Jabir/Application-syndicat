const express = require('express')
const router = express.Router()
const { addPayment, getPayment, getFacture } = require('../controllers/paymentController')
const { requireSignin, isAuth } = require('../middlewares/auth')
const { appartementById } = require('../middlewares/appartement')
const { paymentValidator, paymentById } = require('../middlewares/payment')

router.post('/:idAppart', [requireSignin, isAuth], paymentValidator, addPayment)
router.get('/:idAppart', [requireSignin, isAuth], getPayment)
router.get('/facture/:idPayment', getFacture)

router.param('idAppart', appartementById)
router.param('idPayment', paymentById)

module.exports = router