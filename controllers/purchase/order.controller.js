const {
  createOrder,
  getOrderList,
} = require('../../service/purchase/order.service');

const addOrder = async (req, res) => {
  try {
    const { products, orderAddress, imp_uid } = req.body;
    const { userId } = req.user.id;

    /* if (!userId || !products || !orderAddress) {
      return res
        .status(400)
        .json({ message: "입력이 안된 필드값이 있습니다." });
    } */

    const createResult = await createOrder({
      userId,
      products,
      orderAddress,
      imp_uid,
    });

    if (createResult) {
      return res
        .status(200)
        .json({ data: createResult, message: '구매 완료되었습니다.' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const readOrderList = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('주문내역 조회 유저 아이디', userId);

    const orderList = await getOrderList(userId);

    if (orderList) {
      return res
        .status(200)
        .json({ message: '주문 내역 조회 성공', orderList });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '주문 내역 조회 실패' });
  }
};

module.exports = {
  addOrder,
  readOrderList,
};
