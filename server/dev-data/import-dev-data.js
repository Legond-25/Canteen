const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Food = require('./../models/foodModel');
const User = require('./../models/userModel');
const Review = require('./../models/reviewModel');
const Cart = require('./../models/cartModel');

dotenv.config({ path: './.env' });

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfull!'));

// READ JSON FILE
const foods = JSON.parse(fs.readFileSync(`${__dirname}/foods.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
const carts = JSON.parse(fs.readFileSync(`${__dirname}/carts.json`, 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Food.create(foods, { validateBeforeSave: false });
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews, { validateBeforeSave: false });
    await Cart.create(carts, { validateBeforeSave: false });
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE DATA FROM COLLECTIONS
const deleteData = async () => {
  try {
    await Food.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    await Cart.deleteMany();
    console.log('Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
