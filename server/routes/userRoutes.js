const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Setting Router
const router = express.Router();

// Authentication routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

// Reset password and forget password
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// Creating User Routes
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/getMe', userController.getMe);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// All routes below are only for admin
router.use(authController.restrictTo('admin', 'manager'));

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
