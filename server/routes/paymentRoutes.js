const express = require("express");
const paymentController = require("./../controllers/paymentControllers");
const authController = require("./../controllers/authController");

// Setting Router
const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .get(paymentController.getAllPayments)
  .post(paymentController.createPayment);
router
  .route("/:id")
  .patch(paymentController.updatePayment)
  .get(paymentController.getAllPayments)
  .delete(paymentController.deletePayment);

// Exporting Router
module.exports = router;
