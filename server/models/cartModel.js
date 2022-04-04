const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    foodItems: [
      {
        item: {
          type: mongoose.Schema.ObjectId,
          ref: 'Food',
        },
        quantity: {
          type: Number,
          default: 0,
        },
        total: Number,
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    value: Number,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Document Middleware to calculate total and value
cartSchema.pre('save', function (next) {
  this.foodItems.forEach((foodItem) => {
    foodItem.total = foodItem.item.price * foodItem.quantity;
  });
  next();
});

cartSchema.pre('save', function (next) {
  this.foodItems.forEach((foodItem) => {
    this.value += foodItem.total;
  });
  next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
