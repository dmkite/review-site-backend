const jwt = require('jsonwebtoken')
const authModel = require('../models/auth')

function login(req, res, next){
    const {email, password} = req.body
   
    if(!email || !password) return next({error: 400, message:'Something\'s missing...'})
   
    return authModel.tryLogin(email, password)
    .then(result => {
        const payload = {
            exp: (Date.now() / 1000) + 3600,
            sub: result,
        }

        const token = jwt.sign(payload, process.env.SECRET)
        return res.status(200).send({token})
    })
    .catch(err => next(err))
}


function isAuthenticated(req,res, next){
    if(!req.headers.authorization) return next({status:401, message: "Unauthorized"})
    const [, token] = req.headers.authorization.split(' ')

    jwt.verify(token, process.env.SECRET, (err, payload) => {
        if(err) return next({status:401, message: 'Unauthorized'})
        
        req.claim = payload
        
        next()
    })
}

function getStatus(req, res, next) {
    res.status(200).send({user: req.claim.sub})
}

function confirmReq(req, res, next){
    if(req.claim.sub.id != req.params.id) return next({status:401, message: "Unauthorized"})
    next()
}

module.exports = {login, isAuthenticated, getStatus, confirmReq}