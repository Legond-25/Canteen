const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: 'String',
      trim: true,
      required: [true, 'Review cannot not be empty'],
    },
    rating: {
      type: Number,
      min: [1, 'The rating must be above 1.0'],
      max: [5, 'The rating must be below 5.0'],
    },
    type: {
      type: String,
      required: [true, 'The type of the review is required'],
      enum: ['food', 'app'],
    },
    food: {
      type: mongoose.Schema.ObjectId,
      ref: 'Food',
      required: [true, 'Review must belong to a Food'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a User'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.index(
  { food: 1, user: 1 },
  {
    unique: true,
  }
);

// Query Middleware
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
