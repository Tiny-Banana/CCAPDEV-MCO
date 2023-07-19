const mongoose = require('mongoose')

const Schema = mongoose.Schema

const establishmentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayedName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    numReviews: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    }, 
    tag1: {
        type: String,
        required: true
    },
    tag2: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Establishment', establishmentSchema)