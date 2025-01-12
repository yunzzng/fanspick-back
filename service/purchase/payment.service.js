const Payment = require('../../schemas/purchase/payment.schema');

//결제 생성
const createPayment = async (paymentData) => {
  try {
    const payment = await Payment.create(paymentData);
  } catch (err) {
    console.log('[createPayment] Error ', err);
    throw new Error('결제에 실패했습니다.');
  }
};

module.exports = { createPayment };
