const Razorpay = require('razorpay');
const dotenv = require('dotenv');
const uniqid = require('uniqid');

const Order = require('../models/orderModel');
const catchAsyncError = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');

// Dotenv config
dotenv.config({ path: './../.env' });

// Razorpay initialize
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Getting all orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orderData = await razorpay.orders.all(req.query);

  if (!orderData) {
    return next(new AppError('No Order Items', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: orderData,
    },
  });
});

// Creating A new Order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const options = req.body;
  req.body.receipt = uniqid();

  if (!options) {
    return next(new AppError('Please provide the required data', 422));
  }

  await razorpay.orders.create(options, async (err, order) => {
    try {
      if (err) {
        return next(new AppError(err.error.description, err.statusCode));
      }

      const newOrderItem = await Order.create(order);

      res.status(200).json({
        status: 'success',
        data: newOrderItem,
      });
    } catch (error) {
      return next(new AppError(error.message, 404));
    }
  });
});

// Getting a Order
exports.getOrder = catchAsyncError(async (req, res, next) => {
  const order = await razorpay.orders.fetch(req.params.id);

  if (!order) {
    return next(new AppError('Order not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: order,
    },
  });
});

// Getting Payments for an Order
exports.getPaymentForOrder = catchAsyncError(async (req, res, next) => {
  const payments = await razorpay.orders.fetchPayments(req.params.id);

  if (!payments) {
    return next(new AppError('error', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: payments,
    },
  });
});
