const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Setting Router
const router = express.Router();

// Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Creating User Routes
// router.route('/me').get(userController.getMe);
// router
//   .route('/me/:id')
//   .patch(userController.updateMe)
//   .delete(userController.deleteMe);

// All routes below are only for admin
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
