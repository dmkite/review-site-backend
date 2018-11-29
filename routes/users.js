const userCtrl = require('../controllers/users')
const express = require('express')
const router = express.Router()

router.post('/', userCtrl.create)

module.exports = router