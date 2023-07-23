require('dotenv').config()
const {connectToDb, getDb} = require('./db')
const mongoose = require('mongoose')
const express = require('express')
const cookieParser = require('cookie-parser')
const establishmentRoutes = require('./routes/establishment')
const userRoutes = require('./routes/user')
const { requireAuth, checkUser } = require('./middleware/authMiddleware')
const upload = require('./routes/upload')

//app 
const app = express() 

connectToDb((err) => {
    if (!err) {
        app.listen(3000, () => {
            console.log('listening to 3000')
        })
        db = getDb()
    }
}) 
             
//view engine
app.set('view engine', 'ejs')

//middleware
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

//routes 
app.get('*', checkUser)
app.get('/', (req, res) => {
    res.redirect('/establishments')
})  
app.use(upload)
app.use('/establishments', establishmentRoutes) 
app.use('/user', userRoutes)
 

      