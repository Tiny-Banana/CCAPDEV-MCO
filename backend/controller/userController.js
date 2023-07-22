const User = require('../model/User')
const path = require('path')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
    console.log(err.message, err.code)
}

//ayusin ung logic later
const maxAge = 3 * 24 * 60 * 60
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: maxAge}) 
}

const login = async (req, res) => {
    const currUser = req.body

    try {
        const user = await User.login(currUser)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})

        const redirect = '/user/'+ user.username
        res.status(200).redirect(redirect)
    } catch (error) {
        handleErrors(error)
        res.status(400).json({err: error.message})
    }
} 

const signup = async (req, res) => {
    const currUser = req.body

    try {
        filePath = req.file.path
        currUser.pfp = path.relative('public', filePath)
    } catch(error) {
        currUser.pfp = '/images/pfp/unknown.jpg'
    }
  
    try{
        const user = await User.signup(currUser)
        
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge})

        const redirect = '/user/'+ currUser["username-reg"]
        res.status(200).redirect(redirect)
    } catch (error) {
        handleErrors(error)
        res.status(400).json({err: error.message})
    }
}

const getUser = (req, res) => {
    res.render('user')
}

const showLogin = (req, res) => {
    res.render('login')
}

const showSignup = (req, res) => {
    res.render('signup')
}

const logout = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1})
    res.redirect('/')
}

module.exports = {login, signup, getUser, showLogin, showSignup, logout}