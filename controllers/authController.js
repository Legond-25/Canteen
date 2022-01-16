const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsyncError = require('./../utils/CatchAsync');
const AppError = require('./../utils/AppError');

const signToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsyncError(async (req, res, next) => {
  // 1.) Create new user based on req.body
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
    passwordChangedAt: req.body.passwordChangedAt,
    passwordResetToken: req.body.passwordResetToken,
    passwordResetExpires: req.body.passwordResetExpires,
    active: req.body.active,
  });

  // 2.) Sign JSON token and sennd back to client
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  // 1.) Get email and password from req.body
  const { email, password } = req.body;

  // 2.) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // 3.) Check if user exists and password is correct or not
  const user = await User.findOne({ email }).select('+password');
  const checkPass = await user.comparePassword(password, user.password);

  if (!user || !checkPass) {
    return next(new AppError('Incorrect Email or Password', 401));
  }

  // 4.) Send JSON token back to client
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res
    .status(200)
    .json({ status: 'success', message: 'Successfully logged out' });
};
