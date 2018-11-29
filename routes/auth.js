const authCtrl = require('../controllers/auth')
const express = require('express')
const router = express.Router()

router.post('/login', authCtrl.login)
router.get('/token', authCtrl.isAuthenticated, authCtrl.getStatus)

module.exports = router