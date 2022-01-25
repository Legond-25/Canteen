const Order = require('../models/orderModel');
const catchAsyncError = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');

//Getting all orders
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
  if (req.params.orderId) {
    req.body.order = req.params.orderId;
   // req.body.user = req.user._id;
 }

  const newOrderItem = await Order.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: newOrderItem,
    },
  });
});

// Getting a Order
exports.getOrder = catchAsyncError(async (req, res, next) => {
  const searchedOrder = await Order.findById({ _id: req.params.id });

  if (!searchedOrder) {
    return next(new AppError(' Order not Found', 404));
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
