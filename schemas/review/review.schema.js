const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref: 'User',
    },
    // name: {
    //   type: String,
    //   required: true,
    // },
    productId: {
      type: ObjectId,
      required: true,
      ref: 'Product',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    starpoint: {
      type: Number,
      required: true,
    },
    orderId: {
      type: ObjectId,
      required: true,
      ref: 'Order',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Review', reviewSchema);
