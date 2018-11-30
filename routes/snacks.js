const express = require('express');
const knex = require('../db/knex');

const router = express.Router();

router.get('/snacks', (req, res, next) => {
  knex('snacks')
    .then((result) => {
      res.send(result)
    })
    .catch((err) => next(err))
})

router.get('/snacks/:id', (req, res, next) => {
  const id = req.params.id
  knex('snacks')
    .where('id', id)  
    .then(result => {
      res.send(result)
      })
    .catch(err => next(err))
})

router.get('/snacks/:id/reviews', (req, res, next) => {
  const id = req.params.id
  knex('reviews')
  .where('snack_id', id)
  .innerJoin('users', 'users.id', 'reviews.user_id')
  // .count()
  .then(result => {
    console.log(result)
    result.forEach(review => {
      delete review.hashed_password
      delete review.email
      delete review.last_name
      // delete review.user_id
    })
    res.send(result)
  })
  .catch(err => next(err))
})




module.exports = router;
