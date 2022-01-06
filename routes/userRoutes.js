const express = require('express');
const userController = require('../controllers/userController');
const { route } = require('./foodRoutes');

// Setting Router
const router = express.Router();

// Creating User Routes
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .patch(userController.updateUser)
  .get(userController.getUser)
  .delete(userController.deleteUser);

// Exporting Router
module.exports = router;
