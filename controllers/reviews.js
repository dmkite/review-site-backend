const reviewModel = require('../models/reviews')


function getCount(req, res, next){
    return reviewModel.getCount()
    .then(result => {
        console.log(result)
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
    console.log(req.body)
    const {id, title, text, rating, snack_id, user_id} = req.body
    if (!title || !text || !rating || !snack_id || !user_id) return next({ status: 400, message: 'Missing information' })
    return reviewModel.update(id, title, text, rating, snack_id, user_id)
        .then(review => {
            res.status(201).send({ data: review })
        })
        .catch(err => next(err))
 }

 function remove(req, res, next){
     const id = req.params.id
     return reviewModel.remove(id)
     .then(result => {
         res.status(200).send(result)
     })
     .catch(err => next(err))
 }

module.exports = {create, update, getCount, remove}