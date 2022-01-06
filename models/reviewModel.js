const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a valid food name"],
    trim: true,
    unique: [true, "Food name must be unique"],
  },
  review: {
    type: "String",
    trim: true,
    required: [true, "Review cannot not be empty"],
  },
  rating: {
    type: Number,
    min: [1, "The rating must be above 1.0"],
    max: [5, "The rating must be below 5.0"],
  },
});

const Review = mongoose.model("Food", reviewSchema);

module.exports = Review;
