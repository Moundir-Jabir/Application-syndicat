const express = require('express')
const router = express.Router()
const { addAppartement, updateAppartement, allAppartement } = require('../controllers/appartementController')
const { requireSignin, isAuth } = require('../middlewares/auth')
const { appValidator, updateValidator, appartementById } = require('../middlewares/appartement')

router.get('/', [requireSignin, isAuth], allAppartement)
router.post('/', [requireSignin, isAuth], appValidator, addAppartement)
router.patch('/:id', [requireSignin, isAuth], updateValidator, updateAppartement)

router.param('id', appartementById)

module.exports = router