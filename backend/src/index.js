const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('../routes/routes')

const app = express()
const port = 8000
const origin = 'http://localhost:3000'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(origin))
app.use('/uploads', express.static('uploads'))

app.use(routes)

app.listen(port, () => console.log('Server has been running on port ' + port))
