const {connectToDb, getDb} = require('./db')
const mongoose = require('mongoose')
const express = require('express')
const establishmentRoutes = require('./controller/routes/establishment')

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
app.use(express.json()) //to access req body
app.use(express.static('public'))

//routes 
app.get('/', (req, res) => {
    res.redirect('/establishments')
})  
 
app.use('/establishments', establishmentRoutes) 


   