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
/* 상품 조회(카테고리 & 페이지네이션) */
const findProductCategory = async (page, itemsPerPage, category) => {
  try {
    const limit = itemsPerPage;
    const skip = (page - 1) * limit;

    let filter = {};
    if (category) {
      filter = { 'category.name': category }; // category 필터링 추가
    }
    const product = await Product.find(filter).skip(skip).limit(limit);
    const totalCount = await Product.countDocuments(filter);

    if (!product) {
      return null;
    }
    return { product, totalCount };
  } catch (err) {
    console.log('[getAllfindAllProduct] Error ', err);
    throw new Error('모든 상품 조회에 실패했습니다.', err);
  }
};
/* 모든 상품 조회(페이지네이션) */
const findAllProductByUser = async (userId, page, itemsPerPage) => {
  try {
    const limit = itemsPerPage;
    const skip = (page - 1) * limit;

    const products = await Product.find({ userId })
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const totalCount = await Product.countDocuments({ userId });

    if (!products) {
      return null;
    }
    return { products, totalCount };
  } catch (err) {
    console.log('[getfindAllProductByUser] Error ', err);
    throw new Error('(페이지네이션)모든 상품 조회에 실패했습니다.', err);
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
  findProductCategory,
  findProductById,
  updateProductById,
  deleteProductById,
  findAllProductByUser,
};
