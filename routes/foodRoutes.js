const express = require("express");
const foodController = require("./../controllers/foodController");

// Setting Router
const router = express.Router();

// Creating Food Routes
router
  .route("/")
  .get(foodController.getAllFoods)
  .post(foodController.createFood);
router
  .route("/:id")
  .patch(foodController.updateFood)
  .get(foodController.getSingleFood)
  .delete(foodController.deleteFood);

// Exporting Router
module.exports = router;
