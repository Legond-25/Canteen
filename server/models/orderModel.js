const mongoose = require("mongoose");
const validator = require("validator");

const ordereSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, "please specify the quantity"],
    trim: true,
    validate: [validator.isNumeric, "Please enter a number"],
  },
  totalPrice: {
    type: Number,
    validate: [validator.isNumeric, "Please enter a number"],
  },
  complete: {
    type: Boolean,
  },
});

const Order = mongoose.model("Order", ordereSchema);

module.exports = Order;
