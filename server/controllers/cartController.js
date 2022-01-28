const Cart = require('./../models/cartModel');
const catchAsyncError = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');
const ApiFeatures = require('./../utils/ApiFeatures');

// Getting all food items from DB ----------> Tested (Working)
exports.getAllCarts = catchAsyncError(async (req, res, next) => {
    const features = new ApiFeatures(Cart.find(), req.query)
        .filter()
        .sort()
        .pagination()
        .limitFields();
    const cartData = await features.query;

    if (!cartData) {
        return next(new AppError('No Cart Items', 404));
    } 

    res.status(200).json({
        status: 'success',
        results: cartData.length,
        data: {
            data: cartData,
        },
    });
});

// Creating A new Food Item ----------> Tested (Working)
exports.createCart = catchAsyncError(async (req, res, next) => {
    const newCartItem = await Cart.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            data: newCartItem,
        },
    });
});

// Getting Food Item from DB ----------> Tested (Working)
exports.getCart = catchAsyncError(async (req, res, next) => {
    const searchedCart = await Cart.findById({ _id: req.params.id });

    if (!searchedCart) {
        return next(new AppError('Cart Not Found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: searchedCart,
        },
    });
});

// Updating the particular food item from DB ----------> Tested (Working)
exports.updateCart = catchAsyncError(async (req, res, next) => {
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedCart) {
        return next(new AppError('Cart Not Found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: updatedCart,
        },
    });
});

// Deleting the particular food item from DB ----------> Tested (Working)
exports.deleteCart = catchAsyncError(async (req, res, next) => {
    const deletedCart = await Cart.findByIdAndDelete(req.params.id);

    if (!deletedCart) {
        return next(new AppError('Cart Not Found', 404));
    }

    res.status(200).json({ status: 'success', data: 'none' });
});
