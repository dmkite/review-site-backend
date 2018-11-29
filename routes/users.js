const userCtrl = require('../controllers/users')
const express = require('express')
const router = express.Router()
const authCtrl = require('../controllers/auth')


router.post('/', userCtrl.create)
router.get('/:id/reviews', userCtrl.getReviewsByUser)
module.exports = router