// Requiring Modules
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Requiring files
const foodRouter = require('./routes/foodRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

// Setting up app
const app = express();

// Dotenv config path
dotenv.config({ path: './.env' });

// console.log(`${process.env.NODE_ENV}`);

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

// Test
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Middlewares

// API Routes
app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

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
