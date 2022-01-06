const express = require('express');
const reviewController = require('./../controllers/reviewController');

// Setting Router
const router = express.Router();

// Creating Food Routes
router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);
router
  .route('/:id')
  .patch(reviewController.updateReview)
  .get(reviewController.getReview)
  .delete(reviewController.deleteReview);

// Exporting Router
module.exports = router;
