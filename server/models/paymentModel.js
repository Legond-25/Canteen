const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  id: {
    type: 'String',
  },
  entity: {
    type: String,
  },
  amount: {
    type: String,
  },
  currency: {
    type: String,
  },
  status: {
    type: String,
    enum: {
      values: ['created', 'authorized', 'captured', 'refunded', 'failed'],
      message: 'Invalid status',
    },
  },
  method: {
    type: String,
    enum: {
      values: ['card', 'netbanking', 'wallet', 'upi'],
      message: 'Invalid method',
    },
  },
  order_id: {
    type: String,
  },
  description: {
    type: String,
  },
  refund_status: {
    type: String,
    enum: {
      values: ['null', 'partial', 'full'],
      message: 'Invalid refund status',
    },
  },
  amount_refunded: {
    type: Number,
  },
  captured: {
    type: Boolean,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  fee: {
    type: Number,
  },
  tax: {
    type: Number,
  },
  created_at: {
    type: Number,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
