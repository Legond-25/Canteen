const Cart = require('./../models/cartModel');
const catchAsyncError = require('../utils/CatchAsync');
const AppError = require('./../utils/AppError');

// Getting all cart items
exports.getAllCarts = catchAsyncError(async (req, res, next) => {
  const cartData = await Cart.find();

  if (!cartData) {
    return next(new AppError('No Item In Cart', 404));
  }

  res.status(200).json({
    status: 'success',
    results: cartData.length,
    data: {
      data: cartData,
    },
  });
});

// Getting Cart item from DB
exports.getCart = catchAsyncError(async (req, res, next) => {
  const searchedCart = await Cart.findById({ _id: req.params.id });

  if (!searchedCart) {
    return next(new AppError('Cart Item Not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: searchedCart,
    },
  });
});

// Creating a new Cart Item
exports.createCart = catchAsyncError(async (req, res, next) => {
  const newCartItem = await Cart.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: newCartItem,
    },
  });
});

// Update Cart details
exports.updateCart = catchAsyncError(async (req, res, next) => {
  const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body);

  if (!updatedCart) {
    return next(new AppError('Cart Item Not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updatedCart,
    },
  });
});

// Delete Cart Details
exports.deleteCart = catchAsyncError(async (req, res, next) => {
  const deletedCart = await Cart.findByIdAndDelete(req.params.id);

  if (!deletedCart) {
    return next(new AppError('Cart Item Not Found'), 404);
  }

  res.status(200).json({
    status: 'succes',
    data: 'none',
  });
});
