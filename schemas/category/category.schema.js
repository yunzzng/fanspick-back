const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: [String],
      required: true,
    },
    // parentCategoryId 하위카테고리 고민
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);
module.exports = {
  categorySchema,
  Category,
};
