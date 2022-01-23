const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a Valid Food Name'],
    trim: true,
    unique: [true, 'Food name Must be unique'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter a Valid Price'],
    trim: true,
  },
  ratingsAvg: {
    type: Number,
    default: 0,
    min: [1, 'Ratings Must be above 1'],
    max: [5, 'Ratings Must be below 5'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    required: [true, 'Food must contain a Summary'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Food must contain a description'],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Please enter Quantity of Food'],
  },
  priceDiscount: {
    type: Number,
  },
  imageCover: {
    type: String,
    required: [true, 'Food must contain a Image cover'],
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
    required: [true, 'Food must contain a type'],
  },
  ingredients: {
    type: [String],
    required: [true, 'Please enter food ingredients'],
  },
});

foodSchema.index({ price: 1, ratingsAvg: -1 });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
