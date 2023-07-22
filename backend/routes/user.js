const express = require('express')
const {login, signup, getUser, showLogin, showSignup, logout} = require('../controller/userController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/pfp')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const router = express.Router()

router.get('/login', showLogin)
router.post('/login', login)
router.get('/signup', showSignup)
router.post('/signup', upload.single('file-reg'), signup)
router.get('/logout', logout)
router.get('/:username', getUser)


module.exports = router