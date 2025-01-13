const Product = require('../../schemas/product/product.schema');

/*장바구니, 즐겨찾기 조회*/
const findByIds = async (ids) => {
  try {
    const productDetail = await Product.find({ _id: { $in: ids } });

    if (!productDetail) {
      throw new Error('상품이 없습니다.');
    }
    console.log('productDetail:', productDetail);
    return productDetail;
  } catch (err) {
    console.error('[findByIds] Error:', err);
    throw new Error('상품 조회에 실패했습니다.', err);
  }
};

// 장바구니,즐겨찾기 조회(마이페이지)
const findItemByIds = async (ids, page, itemsPerPage) => {
  try {
    const limit = itemsPerPage;
    const skip = (page - 1) * limit;

    const productDetail = await Product.find({ _id: { $in: ids } })
      .populate('productId', 'name image price')
      .sort('createdAt')
      .skip(skip)
      .limit(limit);

    const totalCount = await Product.countDocuments({ _id: { $in: ids } });

    return { productDetail, totalCount };
  } catch (error) {
    console.error('[ReadReviewsByProduct] Error:', error);
    throw new Error('리뷰 조회에 실패했습니다.', { cause: error });
  }
};

module.exports = {
  findByIds,
  findItemByIds,
};
