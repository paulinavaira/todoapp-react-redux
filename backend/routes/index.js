const user = require('../components/users/routes')
const express = require('express')
const router = express.Router()

router.use('/user', user)

module.exports = router