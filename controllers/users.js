const userModel = require('../models/users')

function create(req, res, next){
    const {first_name, last_name, email, password} = req.body
    
    if(!first_name || !last_name || !email || !password) return next({status:400, message: 'Missing information'})
   
    return userModel.create(first_name, last_name, email, password)
    .then(([result]) => res.status(201).send(result))
    .catch(err => next({status:400, message: 'Try something else'}))
}

module.exports = {create}