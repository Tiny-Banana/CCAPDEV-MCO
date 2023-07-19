require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const establishmentRoutes = require('./controller/routes/establishments')

//app
const app = express() 

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listening to 3000')
        })
        
    })
    .catch((error) => console.log(error))

//view engine
app.set('view engine', 'ejs')

//middleware
// app.use(express.json()) //to access req body
app.use(express.static('public'))

//routes
app.get('/', (req, res) => {
    res.render('index')
})

app.use('/establishments', establishmentRoutes)


