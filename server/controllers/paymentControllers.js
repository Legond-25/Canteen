const Payment = require('../models/paymentModel');
const catchAsyncError = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');

//Getting all payments
exports.getAllPayments = catchAsyncError(async (req, res, next) => {
  const paymentData = await Payment.find();

  if (!paymentData) {
    return next(new AppError('No payment', 404));
  }

  res.status(200).json({
    status: 'success',
    results: paymentData.length,
    data: {
      data: paymentData,
    },
  });
});

// Creating A payment
exports.createPayment = catchAsyncError(async (req, res, next) => {
  if (req.params.paymentId) {
    req.body.payment = req.params.paymentId;
   // req.body.user = req.user._id;
 }

  const newPaymentItem = await Payment.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      data: newPaymentItem,
    },
  });
});  

// Getting a Payment
exports.getPayment = catchAsyncError(async (req, res, next) => {
  const searchedPayment = await Payment.findById({ _id: req.params.id });

  if (!searchedPayment) {
    return next(new AppError(' Payment not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: searchedPayment,
    },
  });
});

// Updating the particular payment
exports.updatePayment = catchAsyncError(async (req, res, next) => {
  const updatePayment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatePayment) {
    return next(new AppError('Order Not Found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: updatePayment,
    },
  });
});

// Deleting the particular payment
exports.deletePayment = catchAsyncError(async (req, res, next) => {
  const deletePayment = await Payment.findByIdAndDelete(req.params.id);

  if (!deletePayment) {
    return next(new AppError('Payment Not Found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: 'none',
  });
});
