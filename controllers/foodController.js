const Food = require('./../models/foodModel');

// Getting all food items from DB ----------> Tested (Working)
exports.getAllFoods = async (req, res) => {
  try {
    const foodData = await Food.find();

    res.status(200).json({
      status: 'success',
      results: foodData.length,
      data: {
        data: foodData,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
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
      status: 'success',
      data: {
        data: updatedFood,
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
exports.deleteFood = async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: 'success', data: 'none' });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

// Creating A new Food Item ----------> Tested (Working)
exports.createFood = async (req, res) => {
  try {
    const newFoodItem = await Food.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: newFoodItem,
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
exports.getFood = async (req, res) => {
  try {
    const searchedFood = await Food.findById({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      data: {
        data: searchedFood,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
