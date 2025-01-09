const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    roadAddress: {
      type: String,
      required: true,
    },
    jibunAddress: {
      type: String,
      required: true,
    },
    zoneCode: {
      type: String,
      required: true,
    },
    detailAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = addressSchema;
