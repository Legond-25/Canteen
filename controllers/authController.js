const { promisify } = require('util');
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

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  };

  res.cookie('jwt', token, cookieOptions);

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
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res
    .status(200)
    .json({ status: 'success', message: 'Successfully logged out' });
};

// To protect routes only for logged in users
exports.protect = catchAsyncError(async (req, res, next) => {
  // 1.) Get token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please login to get access.', 404)
    );
  }

  // 2.) Verify token
  const verified = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3.) Check if user still exists
  const currentUser = await User.findById(verified.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does not exist', 401)
    );
  }

  // 4.) Check if user changed password after token was generated
  if (currentUser.changedPasswordAfter(verified.iat)) {
    return next(
      new AppError('User recently changed password! Please login again!', 401)
    );
  }

  // 5.) GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

// Only for rendered pages, there will be no error
exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      // 1.) Verify token
      const verified = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2.) Check if user still exists
      const currentUser = await User.findById(verified.id);
      if (!currentUser) {
        return next();
      }

      // 3.) Check if user changed password after token was generated
      if (currentUser.changedPasswordAfter(verified.iat)) {
        return next();
      }

      // There is a logged in user
      res.locals.user = currentUser;
      return next();
    }
    next();
  } catch (err) {
    next();
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have the permission to perform this action',
          403
        )
      );
    }

    next();
  };
};

// Implementing Forget Password Route - (in progress)
// exports.forgetPassword = () => {};
// For sending email use nodemailer sendgrid

// Implementing Reset Password Route - (in progress)
// exports.resetPassword = () => {};
