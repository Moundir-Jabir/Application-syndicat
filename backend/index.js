require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const expressValidator = require('express-validator')

//Routers
const authRouter = require('./routes/auth')
const appartementRouter = require('./routes/appartement')
const paymentRouter = require('./routes/payment')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('database connected'))
  .catch((e) => console.log('not connect to database', e))

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(expressValidator())

app.use('/api/auth', authRouter)
app.use('/api/appartement', appartementRouter)
app.use('/api/payment', paymentRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

module.exports = app