const mongoose = require("mongoose");
const validator = require("validator");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a Valid Food Name"],
    trim: true,
    unique: [true, "Food name Must be unique"],
    validate: [validator.isAlpha, "Please provide a valid name"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a Valid Price"],
    trim: true,
    validate: [validator.isNumeric, "Please enter a number"],
  },
  ratingsAvg: {
    type: Number,
    default: 0,
    min: [1, "Ratings Must be above 1"],
    max: [5, "Ratings Must be below 5"],
    validate: [validator.isNumeric, "Please enter a number"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
    validate: [validator.isNumeric, "Please enter a number"],
  },
  summary: {
    type: String,
    required: [true, "Food must contain a Summary"],
    trim: true,
    validate: [validator.isAlpha],
  },
  description: {
    type: String,
    required: [true, "Food must contain a description"],
    trim: true,
    validate: [validator.isAlpha],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter Quantity of Food"],
    validate: [validator.isNumeric, "Please enter a number"],
  },
  priceDiscount: {
    type: Number,
    validate: [validator.isNumeric, "Please enter a number"],
  },
  imageCover: {
    type: String,
    required: [true, "Food must contain a Image cover"],
  },
  slug: String,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  foodType: {
    type: String,
    required: [true, "Food must contain a type"],
    validate: [validator.isAlpha],
  },
  ingredients: {
    type: [String],
    required: [true, "Please enter food ingredients"],
    validate: [validator.isAlphanumeric],
  },
});

foodSchema.index({ price: 1, ratingsAvg: -1 });

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;
