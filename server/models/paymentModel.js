const mongoose = require("mongoose");
const validator = require("validator");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "Please enter a Valid Amount"],
    validate: [validator.isNumeric, "Please enter a number"],
  },
  recipient: {
    type: String,
    required: [true, "Please enter valid recipient name"],
    validate: [validator.isAlpha, "Please provide a valid name"],
  },
  status: {
    type: Boolean,
  },
  paymentMethodname: {
    type: String,
  },
  statusText: {
    type: String,
  },
  currency: {
    type: String,
  },
  createdAt: {
    type: Number,
  },
  updatedAt: {
    type: Number,
  },
  creator: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
