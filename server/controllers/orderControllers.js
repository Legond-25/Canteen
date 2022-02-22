const Razorpay = require('razorpay');
const dotenv = require('dotenv');

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
  const orderData = await Order.find();

  if (!orderData) {
    return next(new AppError('No Order Items', 404));
  }

  res.status(200).json({
    status: 'success',
    results: orderData.length,
    data: {
      data: orderData,
    },
  });
});

// Creating A new Order
exports.createOrder = catchAsyncError(async (req, res, next) => {
  const options = req.body;

  if (!options) {
    return next(new AppError('Please provide the required data', 422));
  }

  await razorpay.orders.create(options, async (err, order) => {
    try {
      if (err) {
        console.log(err);
        return next(new AppError(err.error.description, err.statusCode));
      }

      const newOrderItem = await Order.create(order);

      res.status(200).json({
        status: 'success',
        data: {
          data: newOrderItem,
        },
      });
    } catch (error) {
      console.log(error);
      return next(new AppError(error.message, 404));
    }
  });
});

// Getting a Order
exports.getOrder = catchAsyncError(async (req, res, next) => {
  const searchedOrder = await Order.findById({ _id: req.params.id });

  if (!searchedOrder) {
    return next(new AppError('Order not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: searchedOrder,
    },
  });
});

// Updating the particular order
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updateOrder) {
    return next(new AppError('Order Not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updateOrder,
    },
  });
});

// Deleting the particular food item from DB ----------> Tested (Working)
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const deleteOrder = await Order.findByIdAndDelete(req.params.id);

  if (!deleteOrder) {
    return next(new AppError('Order Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: 'none',
  });
});
