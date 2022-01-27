const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  Amount: {
    type: Number,
    required: [true],
  },
  Recipient: {
    type: String,
  },
  status: {
    type: Boolean,
  },
  paymentMethodname: {
    type: String,
  },
  StatusText: {
      type: String,
  },
  Currency: {
     type: String,
  },
  CreatedAt: {
    type: Number,
  },
  UpdatedAt: {
      type: Number,
  },
  Creator: {
      type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
