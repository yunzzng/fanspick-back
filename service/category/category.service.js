const { Category } = require("../../schemas/category/category.schema");

const findCategory = async () => {
  try {
    const category = await Category.find();
    if (!category) {
      return null;
    }
    return category;
  } catch (err) {
    console.log("[getAllCategory] Error ", err);
    throw new Error("카테고리 찾기에 실패했습니다.");
  }
};

module.exports = {
  findCategory,
};
