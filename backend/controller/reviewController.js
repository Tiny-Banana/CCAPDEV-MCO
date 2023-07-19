const Review = require('../model/Review')
const mongoose = require('mongoose')

const getReviews = async (req, res) => {
    const estab_uname = req.params.estab_id

    const reviews = await Review.find({estab_uname: estab_uname}).sort({createdAt: -1}) //all reviews sorted on the newest
     
    res.status(200).json(reviews)
}
 
const getReview = async (req, res) => {
    const estab_uname = req.params.estab_id
    const rev_id = req.params.rev_id //params sa reviews/ 

    try {
        const review = await Review.find({estab_uname: estab_uname, _id: rev_id})
        if (review.length === 0) {
            return res.status(404).json({error: 'no such review'})
        }
        res.status(200).json(review) 
    } catch (error) {
        return res.status(404).json({error: 'no such review'})
    }
}

const createReview = async (req, res) => {
    const {rating, title, body} = req.body //ung buong ininput sa req

    const estab_uname = req.params.estab_id
 
    try {
        const review = await Review.create({estab_uname, rating, title, body})
        res.status(200).json(review)

    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

const deleteReview = async (req, res) => {
    const estab_uname = req.params.estab_id
    const rev_id = req.params.rev_id

    try {
      const deletedReview = await Review.deleteOne({estab_uname: estab_uname, _id: rev_id })
      if (deletedReview.deletedCount === 0) {
        return res.status(404).json({ error: 'No such review' })
      }
      res.status(200).json({ message: 'Review deleted successfully' })
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete review' })
    }
}

const updateReview = async (req, res) => {
    const estab_uname = req.params.estab_id
    const rev_id = req.params.rev_id

    try {
      const updatedReview = await Review.updateOne({estab_uname: estab_uname, _id: rev_id }, req.body)
      if (updatedReview.modifiedCount === 0) {
        return res.status(404).json({ error: 'No such review' })
      }
      res.status(200).json({ message: 'Review updated successfully' })
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update review' })
    }
}

module.exports = {
    createReview, getReviews, getReview, deleteReview, updateReview
}