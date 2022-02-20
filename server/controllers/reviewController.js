const Review = require('../models/reviewModel');
const catchAsyncError = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');

// Getting all review items from DB ----------> Tested (Working)
exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const reviewData = await Review.find();

  if (!reviewData) {
    return next(new AppError('No Review Items', 404));
  }

  res.status(200).json({
    status: 'success',
    results: reviewData.length,
    data: {
      data: reviewData,
    },
  });
});

// Creating A new Food Item ----------> Tested (Working)
exports.createReview = catchAsyncError(async (req, res, next) => {
  if (req.params.foodId) {
    req.body.food = req.params.foodId;
    req.body.user = req.user._id;
  }

  const newReviewItem = await Review.create(req.body);

  if (!newReviewItem) {
    return next(new AppError('Error creating Review. Please try again!'));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: newReviewItem,
    },
  });
});

// Getting Food Item from DB ----------> Tested (Working)
exports.getReview = catchAsyncError(async (req, res, next) => {
  const searchedReview = await Review.findById({ _id: req.params.id });

  if (!searchedReview) {
    return next(new AppError(' Review not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: searchedReview,
    },
  });
});

// Updating the particular review item from DB ----------> Tested (Working)
exports.updateReview = catchAsyncError(async (req, res, next) => {
  const updateReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updateReview) {
    return next(new AppError('Review Not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updateReview,
    },
  });
});

// Deleting the particular food item from DB ----------> Tested (Working)
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const deleteReview = await Review.findByIdAndDelete(req.params.id);

  if (!deleteReview) {
    return next(new AppError('Review Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: 'none',
  });
});
