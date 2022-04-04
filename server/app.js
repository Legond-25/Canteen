// Requiring Modules
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Requiring files
const foodRouter = require('./routes/foodRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const cartRouter = require('./routes/cartRoutes');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

// Setting up app
const app = express();

// Dotenv config path
dotenv.config({ path: './.env' });

// Implement cors
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Using BodyParser to parse the body
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Using cookieParser
app.use(cookieParser());

// Test
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middlewares

// API Routes
app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/carts', cartRouter);

// Not defined Routes
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Can't find the requested url ${req.originalUrl} on this server!`,
      404
    )
  );
});

// Global error handling
app.use(globalErrorHandler);

// Exporting app
module.exports = app;
