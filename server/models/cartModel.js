const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  products: [
    {
      productId: Number,
      quantity: Number,
      name: String,
      price: Number,
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  modifiedOn: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
