const { findCategory } = require("../../service/category/category.service");

const getAllCategory = async (req, res) => {
  try {
    const category = await findCategory();
    res
      .status(200)
      .json({ data: category, message: "카테고리 데이터 가져오기 성공" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllCategory,
};
