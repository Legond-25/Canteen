const Food = require("../models/foodModel");
const APIFeatures = require("../utils/ApiFeatures");
const catchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");

// Getting all food items from DB ----------> Tested (Working)
exports.getAllFoods = async (req, res) => {
  try {
    // 1.) Basic Filtering
    // excludedFields = ['sort', 'page', 'limit', 'skip'];

    // let query = req.query;

    // excludedFields.forEach((field) => {
    //   delete query[field];
    // });

    // // 2.) Advanced Filtering
    // const queryStr = JSON.stringify(query).replace(
    //   /\b(gte|gt|lte|lt)\b/g,
    //   (match) => `$${match}`
    // );

    // const foodData = await Food.find(query);

    // //sort
    // const sort = req.query.sort.split(',').join(' ');
    // console.log(sort);
    // const foodData = await Food.find(req.query).sort(sort);

    const features = new APIFeatures(Food.find(), req.query)
      .filter()
      .sort()
      .pagination()
      .limit();

    const foodData = await features.query;

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
  }
};

// Updating the particular food item from DB ----------> Tested (Working)
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
  }
};

// Creating A new Food Item ----------> Tested (Working)
exports.createFood = catchAsync(async (req, res, next) => {
  const newFoodItem = await Food.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      data: newFoodItem,
    },
  });
});

// Getting Food Item from DB ----------> Tested (Working)
exports.getFood = async (req, res) => {
  try {
    const searchedFood = await Food.findById({ _id: req.params.id });

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
  }
};
