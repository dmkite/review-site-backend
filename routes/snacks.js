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
  // knex('reviews')
  // .select('reviews.id', 'rating', 'title', 'text', 'user.first_name')
  // .innerJoin('users', 'users.id', 'reviews.user_id')
  // .from('users', 'reviews')
  // .where('snack_id', id)
  // .count()
  knex.raw('SELECT reviews.id, reviews.rating, reviews.title, reviews.snack_id, reviews.text, reviews.user_id, users.first_name FROM reviews INNER JOIN users ON users.id = reviews.user_id')
  .then(result => {
    // result.forEach(review => {
    //   delete review.hashed_password
    //   delete review.email
    //   delete review.last_name
    //   // delete review.user_id
    // })
    result = result.rows.filter(item => item.snack_id == id)
    res.send(result)
  })
  .catch(err => next(err))
})




module.exports = router;
