const express = require('express')
const router = express.Router()
const reviewCtrl = require('../controllers/reviews')
const authCtrl = require('../controllers/auth')

router.get('/count', reviewCtrl.getCount)

router.post('/:id', authCtrl.isAuthenticated, authCtrl.confirmReq, reviewCtrl.create)
router.put('/:id', authCtrl.isAuthenticated, authCtrl.confirmReq, reviewCtrl.update)



module.exports = router