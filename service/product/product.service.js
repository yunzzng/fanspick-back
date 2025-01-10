const Product = require('../../schemas/product/product.schema');

/* 상품 등록 */
const createProduct = async (Data) => {
  try {
    const product = await Product.create(Data);
    console.log(product);
  } catch (err) {
    console.log('[createProduct] Error ', err);
    throw new Error('상품 생성에 실패했습니다.');
  }
};
/* 모든 상품 조회 */
const findAllProduct = async () => {
  try {
    const product = await Product.find();
    if (!product) {
      return null;
    }
    return product;
  } catch (err) {
    console.log('[getAllfindAllProduct] Error ', err);
    throw new Error('모든 상품 조회에 실패했습니다.');
  }
};
/* 단일 상품 조회 */
const findProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log('[getFindProductById] Error ', err);
    throw new Error('상품 상세 조회에 실패했습니다.');
  }
};
module.exports = {
  createProduct,
  findAllProduct,
  findProductById,
};
