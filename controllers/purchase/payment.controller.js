const { createPayment } = require('../../service/purchase/payment.service');

const addPayment = async (req, res, next) => {
  try {
    const { userId, pg, pay_method, merchant_uid, amount, name } = req.body;

    const createResult = await createPayment({
      userId,
      pg,
      pay_method,
      merchant_uid,
      amount,
      name,
    });

    res
      .status(200)
      .json({ data: createResult, message: '구매 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    // return res.status(500).json({ message: err.message });
    next(err);
  }
};

module.exports = {
  addPayment,
};
