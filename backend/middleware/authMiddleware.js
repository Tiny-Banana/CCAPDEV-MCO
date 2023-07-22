const jwt = require('jsonwebtoken')
const User = require('../model/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/user/login')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/user/login')
    }
}

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
         jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                let user = await User.findById(decodedToken._id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = {requireAuth, checkUser}