const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pfp: {
        type: String
    }
})

userSchema.statics.signup = async function (currUser) {
    const exists = await this.findOne({username: currUser["username-reg"]})

    if (exists) {
        throw Error('Username already in use')
        //error checking modal
    }
    // if (!validator.isStrongPassword(password)) {
    //     throw Error('Password is not strong enough')
    // }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(currUser["password-reg"], salt)

    const user = this.create({username: currUser["username-reg"], password: hash, description: currUser["about-you-reg"], pfp: currUser.pfp})
    return user
} 

userSchema.statics.login = async function (currUser) {
    const user = await this.findOne({username: currUser["username-login"]})
    
    if (user) {
        const auth = await bcrypt.compare(currUser["password-login"], user.password)
        if (auth) {
             return user
        } else {
             throw Error('incorrect password')
        }
    }

   throw Error('incorrect username')
    //error checking modal
}

module.exports =  mongoose.model('User', userSchema)