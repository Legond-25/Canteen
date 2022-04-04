const mongoose = require('mongoose');
const slugify = require('slugify');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a Valid Food Name'],
      trim: true,
      unique: [true, 'Food name Must be unique'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter a Valid Price'],
      trim: true,
    },
    ratingsAvg: {
      type: Number,
      default: 0,
      min: [1, 'Ratings Must be above 1'],
      max: [5, 'Ratings Must be below 5'],
      set: (val) => {
        Math.round(val * 10) / 10;
      },
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      required: [true, 'Food must contain a Summary'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Food must contain a description'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Please enter quantity of food'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    imageCover: {
      type: String,
      required: [true, 'Food must contain a Image cover'],
    },
    slug: String,
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    foodType: {
      type: String,
      required: [true, 'Food must contain a type'],
    },
    ingredients: {
      type: [String],
      required: [true, 'Please enter food ingredients'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

foodSchema.index({ price: 1, ratingsAvg: -1 });
foodSchema.index({ slug: 1 });

// Virtual Populate
foodSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'food',
  localField: '_id',
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
foodSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
