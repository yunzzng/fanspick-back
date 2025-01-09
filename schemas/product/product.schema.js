const mongoose = require("mongoose");
const { categorySchema } = require("../category/category.schema");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    introduce: {
      type: String,
      required: true,
    },
    // 배열로 관리
    image: {
      type: String,
      required: true,
    },
    detailImage: {
      type: [String],
      required: true,
    },
    category: {
      type: categorySchema,
      required: true,
    },
  },
  {
    // 삭제된 시간 추가
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
