const { createProduct } = require("../../service/product/product.service");

const addProduct = async (req, res) => {
  try {
    const { name, price, introduce } = req.body;

    if (!name || !price || !introduce) {
      return res
        .status(400)
        .json({ message: "입력이 안된 필드값이 있습니다." });
    }

    const createResult = await createProduct({
      name,
      price,
      introduce,
      image: "",
      detailImage: "",
    });

    if (createResult) {
      return res
        .status(200)
        .json({ data: createResult, message: "상품 등록 완료되었습니다." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProduct,
};
