const express = require('express')
const router = express.Router()
const { signin, signout } = require("../controllers/authController.js")

router.post('/login', signin)
router.get('/logout', signout)

module.exports = router