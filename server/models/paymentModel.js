const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please enter a Valid Amount'],
  },
  recipient: {
    type: String,
    required: [true, 'Please enter valid recipient name'],
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

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
