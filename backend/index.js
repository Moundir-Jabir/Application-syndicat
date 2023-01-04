require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

//Routers
const authRouter = require('./routes/auth')

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('database connected'))
  .catch((e) => console.log('not connect to database', e))

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

module.exports = app