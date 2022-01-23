const express = require('express');
const foodController = require('./../controllers/foodController');
const reviewRouter = require('./reviewRoutes');

// Setting Router
const router = express.Router();

router.use('/:foodId/reviews/', reviewRouter);

// Creating Food Routes
router
  .route('/')
  .get(foodController.getAllFoods)
  .post(foodController.createFood);
router
  .route('/:id')
  .patch(foodController.updateFood)
  .get(foodController.getFood)
  .delete(foodController.deleteFood);

// Exporting Router
module.exports = router;
