const Product = require('../../schemas/product/product.schema');

/* 상품 등록 */
const createProduct = async (Data) => {
  try {
    const product = await Product.create(Data);
    console.log(product);
  } catch (err) {
    console.log('[createProduct] Error ', err);
    throw new Error('상품 생성에 실패했습니다.', err);
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
    throw new Error('모든 상품 조회에 실패했습니다.', err);
  }
};
/* 단일 상품 조회 */
const findProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (err) {
    console.log('[getFindProductById] Error ', err);
    throw new Error('상품 상세 조회에 실패했습니다.', err);
  }
};
/* 단일 상품 수정 */
const updateProductById = async ({
  _id,
  userId,
  name,
  price,
  introduce,
  image,
  detailImage,
  category,
}) => {
  try {
    const update = await Product.updateOne(
      { _id },
      { userId, name, price, introduce, image, detailImage, category },
    );
    // console.log('update ', update);
    return update;
  } catch (err) {
    throw new Error('단일 상품 수정에 실패했습니다.', err);
  }
};

/* 단일 상품 삭제 */
const deleteProductById = async (id) => {
  try {
    const deleted = await Product.findByIdAndDelete(id);
    return deleted;
  } catch (err) {
    throw new Error('단일 상품 삭제에 실패했습니다.', err);
  }
};

module.exports = {
  createProduct,
  findAllProduct,
  findProductById,
  updateProductById,
  deleteProductById,
};
