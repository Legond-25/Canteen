const express = require('express');
const foodController = require('./../controllers/foodController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./reviewRoutes');

// Setting Router
const router = express.Router();

router.use(
  '/:foodId/reviews/',
  authController.protect,
  authController.restrictTo('user'),
  reviewRouter
);

// Creating Food Routes
router
  .route('/')
  .get(foodController.getAllFoods)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    foodController.createFood
  );
router
  .route('/:id')
  .get(foodController.getFood)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    foodController.updateFood
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'manager'),
    foodController.deleteFood
  );

// Exporting Router
module.exports = router;
