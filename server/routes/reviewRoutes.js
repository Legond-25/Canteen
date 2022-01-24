const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

// Setting Router
const router = express.Router({ mergeParams: true });

// POST: /foods/64766767f67/reviews/567999797
// GET: /foods/64766767f67/reviews/567999797

router.use(authController.protect);

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
