const Product = require('../../schemas/product/product.schema');

/*장바구니, 즐겨찾기 조회*/
const findByIds = async (ids) => {
  try {
    const productDetail = await Product.find({ _id: { $in: ids } });

    if (!productDetail) {
      throw new Error('상품이 없습니다.');
    }

    return productDetail;
  } catch (err) {
    console.error('[findByIds] Error:', err);
    throw new Error('상품 조회에 실패했습니다.', err);
  }
};

module.exports = {
  findByIds,
};
