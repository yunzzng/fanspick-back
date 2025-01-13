const Order = require('../../schemas/purchase/order.schema');

//주문 생성
const createOrder = async (orderData) => {
  try {
    const order = await Order.create(orderData);
  } catch (err) {
    console.log('[createOrder] Error ', err);
    throw new Error('주문에 실패했습니다.');
  }
};

//주문 조회
const getOrderList = async (userId) => {
  try {
    const orderList = await Order.find({ userId }).populate(
      'products.productId',
      'name price introduce',
    );
    return orderList;
  } catch (err) {
    console.log('[getOrderList] Error', err);
    throw new Error('주문 목록 조회에 실패했습니다.');
  }
};

module.exports = { createOrder, getOrderList };
