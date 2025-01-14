const mongoose = require('mongoose');
const addressSchema = require('../mypage/address.schema');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: function () {
        return this.provider !== 'kakao';
      },
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === 'local'; 
      },
    },
    termsAccepted: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'manager'],
      required: true,
    },
    address: {
      type: addressSchema,
      required: false,
    },
    profileImage: {
      type: String,
      required: false,
    },
    businessNumber: {
      type: String,
      required: false,
    },
    // OAuth 관련 필드 추가
    provider: {
      type: String,
      required: true,
      enum: ['local', 'google', 'kakao', 'naver'], 
      default: 'local', 
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', userSchema);
