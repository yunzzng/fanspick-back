const {
  createOrder,
  getOrderList,
} = require('../../service/purchase/order.service');
const createError = require('../../utils/error');

const addOrder = async (req, res, next) => {
  try {
    const { userId, products, orderAddress, imp_uid, totalPrice } = req.body;

    if (!orderAddress) {
      throw createError(400, '입력이 안된 필드값이 있습니다.');
    }

    const createResult = await createOrder({
      userId,
      products,
      orderAddress,
      imp_uid,
      totalPrice,
    });

    res
      .status(200)
      .json({ data: createResult, message: '구매 완료되었습니다.' });
  } catch (err) {
    next(err);
  }
};

const readOrderList = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page, itemsPerPage } = req.query;

    console.log('주문내역 조회 유저 아이디', userId);

    if (!userId) {
      throw createError(400, '유효한 userId가 필요합니다.');
    }

    const { orderList, totalCount } = await getOrderList(
      userId,
      page,
      itemsPerPage,
    );

    if (orderList) {
      return res
        .status(200)
        .json({ message: '주문 내역 조회 성공', orderList, totalCount });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addOrder,
  readOrderList,
};
