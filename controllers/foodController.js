<<<<<<< HEAD
const Food = require('./../models/foodModel');
const ApiFeatures = require('./../utils/ApiFeatures');
const catchAsyncError = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');
=======
const Food = require("../models/foodModel");
const APIFeatures = require("../utils/ApiFeatures");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
>>>>>>> 870e8876e5cd46e3ce95eca16c7ddd2cb601df83

// Getting all food items from DB ----------> Tested (Working)
exports.getAllFoods = catchAsyncError(async (req, res, next) => {
  const features = new ApiFeatures(Food.find(), req.query)
    .filter()
    .sort()
    .pagination()
    .limitFields();
  const foodData = await features.query;

  if (!foodData) {
    return next(new AppError('No Food Items', 404));
  }

  res.status(200).json({
    status: 'success',
    results: foodData.length,
    data: {
      data: foodData,
    },
  });
});

// Creating A new Food Item ----------> Tested (Working)
exports.createFood = catchAsyncError(async (req, res, next) => {
  const newFoodItem = await Food.create(req.body);

<<<<<<< HEAD
  res.status(200).json({
    status: 'success',
    data: {
      data: newFoodItem,
    },
  });
});
=======
    const features = new APIFeatures(Food.find(), req.query)
      .filter()
      .sort()
      .pagination()
      .limitFields();
>>>>>>> 870e8876e5cd46e3ce95eca16c7ddd2cb601df83

// Getting Food Item from DB ----------> Tested (Working)
exports.getFood = catchAsyncError(async (req, res, next) => {
  const searchedFood = await Food.findById({ _id: req.params.id });

<<<<<<< HEAD
  if (!searchedFood) {
    return next(new AppError('Food Item Not Found', 404));
=======
    res.status(200).json({
      status: "success",
      results: foodData.length,
      data: {
        data: foodData,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      error: {
        data: err,
      },
    });
>>>>>>> 870e8876e5cd46e3ce95eca16c7ddd2cb601df83
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: searchedFood,
    },
  });
});

// Updating the particular food item from DB ----------> Tested (Working)
<<<<<<< HEAD
exports.updateFood = catchAsyncError(async (req, res, next) => {
  const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedFood) {
    return next(new AppError('Food Item Not Found', 404));
=======
exports.updateFood = async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: updatedFood,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
      error: {
        data: err,
      },
    });
  }
};

// Deleting the particular food item from DB ----------> Tested (Working)
exports.deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: "none" });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
      error: {
        data: err,
      },
    });
>>>>>>> 870e8876e5cd46e3ce95eca16c7ddd2cb601df83
  }

  res.status(200).json({
    status: "success",
    data: {
      data: updatedFood,
    },
  });
});

// Deleting the particular food item from DB ----------> Tested (Working)
exports.deleteFood = catchAsyncError(async (req, res, next) => {
  const deletedFood = await Food.findByIdAndDelete(req.params.id);

<<<<<<< HEAD
  if (!deletedFood) {
    return next(new AppError('Food Item Not Found', 404));
=======
    res.status(200).json({
      status: "success",
      data: {
        data: searchedFood,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
      error: {
        data: err,
      },
    });
>>>>>>> 870e8876e5cd46e3ce95eca16c7ddd2cb601df83
  }

  res.status(200).json({ status: 'success', data: 'none' });
});
