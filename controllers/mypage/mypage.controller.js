const {
  findByIds,
  findItemByIds,
} = require('../../service/mypage/mypage.service');

const getProductsByIds = async (req, res) => {
  try {
    const { ids } = req.query;
    console.log('ids', ids);

    const productDetail = await findByIds(ids);
    if (productDetail === null) {
      return res.status(400).json({ message: '조회한 상품이 없습니다.' });
    }

    console.log('컨트롤러', productDetail);

    return res.status(200).json({
      productDetail,
      message: '장바구니 혹은 즐겨찾기 조회 성공',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProductsByIds,
};
