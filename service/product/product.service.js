const Product = require("../../schemas/product/product.schema");

const createProduct = async (Data) => {
  try {
    const product = await Product.create(Data);
    console.log(product);
  } catch (err) {
    console.log("[createProduct] Error ", err);
    throw new Error("상품 생성에 실패했습니다.");
  }
};

module.exports = {
  createProduct,
};
