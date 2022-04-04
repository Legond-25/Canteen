const express = require('express');
const paymentController = require('./../controllers/paymentController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.protect);

// router.route('/:id/capture');

router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPayment);

module.exports = router;
