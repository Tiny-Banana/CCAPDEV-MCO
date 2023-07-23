const express = require('express')
const {login, signup, getUser, showLogin, showSignup, logout} = require('../controller/userController')


const router = express.Router()

router.get('/login', showLogin)
router.post('/login', login)
router.get('/signup', showSignup)
router.post('/signup', signup)
router.get('/logout', logout)
router.get('/:username', getUser)

 
module.exports = router