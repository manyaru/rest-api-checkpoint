const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  email: { type: String, required: true }
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
