const express = require('express');
const cartController = require('./../controllers/cartController');

// Setting Router
const router = express.Router();

// Creating Food Routes
router
  .route('/')
  .get(cartController.getAllCarts)
  .post(cartController.createCart);
router
  .route('/:id')
  .patch(cartController.updateCart)
  .get(cartController.getCart)
  .delete(cartController.deleteCart);

// Exporting Router
module.exports = router;
