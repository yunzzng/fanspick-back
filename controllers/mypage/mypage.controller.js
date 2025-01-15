const createError = require('../../utils/error');

const { findByIds } = require('../../service/mypage/mypage.service');

const getProductsByIds = async (req, res, next) => {
  try {
    const { ids } = req.query;
    console.log('ids', ids);

    const productDetail = await findByIds(ids);
    if (productDetail === null) {
      throw createError(404, '조회한 상품이 없습니다.');
    }

    console.log('컨트롤러', productDetail);

    return res.status(200).json({
      productDetail,
      message: '장바구니 혹은 즐겨찾기 조회 성공',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProductsByIds,
};
