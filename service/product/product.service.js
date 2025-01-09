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

const findAllProduct = async () => {
  try {
    const product = await Product.find();
    if (!product) {
      return null;
    }
    return product;
  } catch (err) {
    console.log("[getAllfindAllProduct] Error ", err);
    throw new Error("모든 상품 조회에 실패했습니다.");
  }
};
module.exports = {
  createProduct,
  findAllProduct,
};
