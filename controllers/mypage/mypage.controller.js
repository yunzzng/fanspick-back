const { findByIds } = require('../../service/mypage/mypage.service');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const getProductsByIds = async (req, res) => {
  try {
    const { ids } = req.query;
    console.log('ids', ids);

    const products = await findByIds(ids);
    if (products === null) {
      return res.status(400).json({ message: '조회한 상품이 없습니다.' });
    }

    const responseData = products.map((product) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    }));

    return res.status(200).json({
      products: responseData,
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
