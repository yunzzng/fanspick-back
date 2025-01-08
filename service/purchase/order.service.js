const Order = require("../../schemas/purchase/order.schema");
const mongoose = require("mongoose");

const createOrder = async (orderData) => {
  const { products, userId } = orderData;

  console.log("test", products);
  const totalPrice = products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  try {
    const order = await Order.create({
      ...orderData,
      userId,
      products,
      totalPrice,
    });
    console.log("진짜테스트", order);
  } catch (err) {
    console.log("[createOrder] Error ", err);
    throw new Error("주문에 실패했습니다.");
  }
};

module.exports = { createOrder };
