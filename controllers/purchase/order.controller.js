const { createOrder } = require("../../service/purchase/order.service");

const addOrder = async (req, res) => {
  try {
    const { userId, products, orderAddress, imp_uid } = req.body;

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
        .json({ data: createResult, message: "구매 완료되었습니다." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addOrder,
};
