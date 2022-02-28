const Razorpay = require('razorpay');
const dotenv = require('dotenv');

const catchAsyncError = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');

// Dotenv config
dotenv.config({ path: './../.env' });

// Razorpay initialize
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Getting all Payments
exports.getAllPayments = catchAsyncError(async (req, res, next) => {
  const paymentData = await razorpay.payments.all(req.query);

  if (!paymentData) {
    return next(new AppError('No Payment Items', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: paymentData,
    },
  });
});

// Getting a payment
exports.getPayment = catchAsyncError(async (req, res, next) => {
  const payment = await razorpay.payments.fetch(req.body.razorpay_payment_id);

  if (!payment) {
    return next(new AppError('Payment not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: payment,
    },
  });
});
