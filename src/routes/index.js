const express = require('express')
const router = express.Router()
const auth = require('./auth')
const user = require('./user')
const absen = require('./absen')

router.use('/auth', auth)
router.use('/user', user)
router.use('/absensi', absen)

module.exports = router