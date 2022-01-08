// Requiring Modules
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Requiring files
const foodRouter = require('./routes/foodRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

// Setting up app
const app = express();

// Dotenv config path
dotenv.config({ path: './.env' });

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

// Middlewares

// API Routes
app.use('/api/v1/foods', foodRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// Test
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Exporting app
module.exports = app;
