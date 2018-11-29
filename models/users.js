const knex = require('../db/knex')
const bcrypt = require('bcrypt')

///////////////////////////////////////////////////////////////////////////////
//  CRUD
///////////////////////////////////////////////////////////////////////////////
function getOneFrom(table, id) {
    return knex(table)
        .where('id', id)
        // .first()
}

function checkForUser(email){
    return knex('users')
    .where('email', email)
    .first()
}

function create(first_name, last_name, email, password){
    return checkForUser(email)
    .then(data =>{
        if(data) return false
        return bcrypt.hash(password, 10)
    })
    .then(hashed_password => {
        return knex('users')
        .insert({
            first_name,
            last_name,
            email,
            hashed_password
        })
        .returning('*')    
    })
}

module.exports = {create, checkForUser, getOneFrom}