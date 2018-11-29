const knex = require('../db/knex')
const userModel = require('../models/users')
const bcrypt = require('bcrypt')

function tryLogin(email, password){
    return userModel.checkForUser(email)
    .then(user =>{
        if(!user) throw {status:400, message: `No user found with email of ${email}`}
        return bcrypt.compare(password, user.hashed_password)
        .then(authStatus => {
            if (!authStatus) throw { status: 401, message: 'Unauthorized' }
            delete user.hashed_password
            return user
        })
    })
    
    
}

module.exports = {tryLogin}