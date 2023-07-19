const express = require('express')
const {
    createReview,
    getReviews,
    getReview,
    deleteReview,
    updateReview
} = require('../reviewController')

const router = express.Router()

router.get('/', (req, res) => {
    res.json({msg: 'GET establishments'})
})

router.get('/:estab_id', (req, res) => {
    res.json({msg: 'GET single establishment'})
})

 //redirect to estab_id
router
    .route('/:estab_id/reviews')
    .get(getReviews)
    .post(createReview)
     
router
    .route('/:estab_id/reviews/:rev_id')
    .get(getReview)
    .delete(deleteReview)
    .patch(updateReview)

module.exports = router

