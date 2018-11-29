const reviewModel = require('../models/reviews')


function getCount(req, res, next){
    return reviewModel.getCount()
    .then(result => {
        res.status(200).send({data: result})
    })
    .catch(err => next(err))
}

function create(req, res, next){
    const {title, text, rating, snack_id, user_id} = req.body
    if(!title || !text || !rating || !snack_id || !user_id) return next({status:400, message: 'Missing information'})
    return reviewModel.create(title, text, rating, snack_id, user_id)
    .then(review => {
        res.status(201).send({data: review})
    })
    .catch(err => next(err))
}

function update(req, res, next) {
    const {title, text, rating, snack_id, user_id} = req.body
    if (!title || !text || !rating || !snack_id || !user_id) return next({ status: 400, message: 'Missing information' })
    return reviewModel.update(title, text, rating, snack_id, user_id)
        .then(review => {
            res.status(201).send({ data: review })
        })
        .catch(err => next(err))
 }
module.exports = {create, update, getCount}