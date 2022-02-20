const mongoose = require('mongoose');

const ordereSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: [true, 'please specify the quantity'],
    trim: true,
  },
  totalPrice: {
    type: Number,
  },
  complete: {
    type: Boolean,
  },
});

const Order = mongoose.model('Order', ordereSchema);

module.exports = Order;
