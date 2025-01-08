const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    /* 총금액 */
    totalPrice: {
      type: Number,
      required: true,
    },

    /* 타입 */
    orderAddress: {
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
      detail: {
        type: String,
        required: true,
      },
    },
    imp_uid: {
      type: String,
      required: true,
      ref: "Payment",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
