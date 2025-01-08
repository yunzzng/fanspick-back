const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    /*  */
    imp_uid: {
      // 아임포트에서 제공하는 결제 고유 ID
      type: String,
      required: true,
    },

    /* 필수x */
    merchant_uid: {
      // 아임포트에서 제공하는 가맹점 주문 ID
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
