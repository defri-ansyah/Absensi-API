require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT
const bodyParser = require('body-parser')
var cors = require('cors')
const routes = require('./src/routes/index')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/images', express.static('./images'))

// routes
app.use('/api', routes)


app.listen(PORT, () => console.log(`server is running port ${PORT}
http://localhost:${PORT}`))