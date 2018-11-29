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



module.exports = router;
