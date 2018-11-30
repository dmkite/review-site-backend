const knex = require('../db/knex')
const userModel = require('../models/users')

function getCount(){
    return knex('reviews')
    .select('snack_id')
    .count('*')
    .groupBy('snack_id')
    //select snack_id, count(*) from reviews group by snack_id
}

function create(title, text, rating, snack_id, user_id){
    return userModel.getOneFrom('users', user_id)
    .then(result => {
        if(!result) throw {status:400, message: "Bad request"}
        return userModel.getOneFrom('snacks', snack_id)
    })
    .then(result =>{
        if (!result) throw { status: 400, message: "Bad request" }
        return knex('reviews')
        .where({snack_id, user_id})
    })
    .then(([review]) => {
        if (review) throw { status: 400, message: "You have already reviewed this item" }
        return knex('reviews')
        .insert({title, text, rating, snack_id, user_id})
        .returning('*')
    })
}

function update(id, title, text, rating, snack_id, user_id){
    return knex('reviews')
    .where({id})
    .then(review => {
        if(!review) throw {status:400, message: "Bad request"}
        return knex('reviews')
        .where({ snack_id, user_id })
        .update({ title, text, rating })
        .returning('*')
    })
}

function remove(id){
    return knex('reviews')
    .del()
    .where('id', id)
    .returning('*')
}

module.exports = {create, update, getCount, remove}