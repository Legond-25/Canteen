const Review = require('../models/reviewModel');

// Getting all review items from DB ----------> Tested (Working)
exports.getAllReviews = async (req, res) => {
  try {
    const reviewData = await Review.find();

    res.status(200).json({
      status: 'success',
      results: reviewData.length,
      data: {
        data: reviewData,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Updating the particular review item from DB ----------> Tested (Working)
exports.updateReview = async (req, res) => {
  try {
    const updateReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        data: updateReview,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Deleting the particular food item from DB ----------> Tested (Working)
exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', data: 'none' });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Creating A new Food Item ----------> Tested (Working)
exports.createReview = async (req, res) => {
  try {
    const newReviewItem = await Review.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: newReviewItem,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Getting Food Item from DB ----------> Tested (Working)
exports.getReview = async (req, res) => {
  try {
    const searchedReview = await Review.findById({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        data: searchedReview,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
