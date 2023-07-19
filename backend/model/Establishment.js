const mongoose = require('mongoose')

const Schema = mongoose.Schema

const establishmentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Establishment', establishmentSchema)