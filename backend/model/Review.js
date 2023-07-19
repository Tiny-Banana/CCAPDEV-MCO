const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    estab_uname: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
    //add later ung media files
}, {timestamps: true})

module.exports = mongoose.model('Review', reviewSchema)