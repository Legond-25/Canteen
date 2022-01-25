const mongoose = require("mongoose");

const ordereSchema = new mongoose.Schema({
  Quantity: {
    type: Number,
    required: [true, "please specify the quantity"],
    trim: true,
  },
  TotalPrice: {
    type: Number,
  },
  complete: {
    type: Boolean,
  },
});

const Order = mongoose.model("Order", ordereSchema);

module.exports = Order;
