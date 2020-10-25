const express = require('express')
const cors = require('cors')
const router = require('./routes/index')

require('dotenv').config()

require('./config/db')

const server = express()

server.use(cors())
server.use(express.json())

server.use('/api', router)

server.listen(4000, () => console.log("App listening on port 4000"))
