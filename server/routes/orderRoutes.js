const express = require('express');
const orderController = require('./../controllers/orderControllers');
const authController = require('./../controllers/authController');

// Setting Router
const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);
router
  .route('/:id')
  .patch(orderController.updateOrder)
  .get(orderController.getOrder)
  .delete(orderController.deleteOrder);

// Exporting Router
module.exports = router;
