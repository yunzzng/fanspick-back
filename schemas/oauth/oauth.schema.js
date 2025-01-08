const mongoose = require('mongoose');
const addressSchema = require('../mypage/address.schema');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String,
    required: true,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "manager"],
    required: true,
  },
  address: {
    type: addressSchema, 
    required: false,     
  },
  profileImage: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

