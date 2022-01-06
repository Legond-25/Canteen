const User = require("../models/userModel");

// Getting all users from DB ----------> Tested (Working)
exports.getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();

    res.status(200).json({
      status: "success",
      results: userData.length,
      data: {
        data: userData,
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

// Updating the particular user from DB ----------> Tested (Working)
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: updatedUser,
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

// Deleting the particular user from DB ----------> Tested (Working)
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: "none",
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

// Creating a new user ----------> Tested (Working)
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        data: newUser,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
      error: {
        data: err,
      },
    });
  }
};

// Getting A single user ----------> Tested (Working)
exports.getUser = async (req, res) => {
  try {
    const searchedUser = await User.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: {
        data: searchedUser,
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
