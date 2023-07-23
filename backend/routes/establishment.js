const express = require('express')
const Establishment = require('../model/Establishment')

const {
    createReview,
    getReviews,
    getReview,
    deleteReview,
    updateReview
} = require('../controller/reviewController')

const router = express.Router()

//establishment controller create
router.get('/', (req, res) => {
    Establishment.find({})
     .then((results) => {
        res.render('index', {establishments: results}) 
     })
     .catch((error) => {
        console.error('Error fetching establishments:', error);
     });
})  

router.get('/:username', (req, res) => {
   username = req.params.username
   Establishment.find({username: username})
    .then((result) => {
        res.render('establishment', {establishment: result})
    })
    .catch((error) => {
        console.error('Error fetching establishment:', error);
     });

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

