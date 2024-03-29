const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  amount: {
    // in Paise
    type: Number,
    set: (val) => {
      return val * 100;
    },
  },
  currency: {
    type: String,
    enum: {
      values: ['INR'],
      message: 'Only INR currency accepted',
    },
  },
  receipt: {
    type: String,
    maxlength: 40,
  },
  status: {
    type: String,
    enum: {
      values: ['created', 'attempted', 'paid'],
      message: 'Order status can only be created, attempted or paid',
    },
  },
  attempts: Number,
  notes: Object,
  created_at: Number,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
