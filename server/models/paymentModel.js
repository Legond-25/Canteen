const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  id: String,
  entity: String,
  amount: String,
  currency: String,
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
  order_id: String,
  description: String,
  refund_status: {
    type: String,
    enum: {
      values: ['null', 'partial', 'full'],
      message: 'Invalid refund status',
    },
  },
  amount_refunded: Number,
  invoice_id: String,
  captured: Boolean,
  email: String,
  contact: String,
  fee: Number,
  tax: Number,
  created_at: Number,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
