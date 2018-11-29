const express = require('express')
const router = express.Router()
const reviewCtrl = require('../controllers/reviews')
const authCtrl = require('../controllers/auth')

router.post('/', authCtrl.isAuthenticated, authCtrl.confirmReq, reviewCtrl.create)
router.put('/', authCtrl.isAuthenticated, authCtrl.confirmReq, reviewCtrl.update)

module.exports = router