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

router.get('/:id', orderController.getOrder);
router.get('/:id/payments', orderController.getPaymentForOrder);

// Exporting Router
module.exports = router;
