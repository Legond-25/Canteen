const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name."],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  photo: {
    type: String,
    default: "user.jpg",
  },
  role: {
    type: String,
    enum: ["user", "manager", "worker", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please confirm your password"],
    minlength: [8, "Password must contain minimum 8 characters"],
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
