const express = require('express');
const {
  addOrder,
  readOrderList,
} = require('../../controllers/purchase/order.controller');
const passport = require('passport');
const { addPayment } = require('../../controllers/purchase/payment.controller');
const router = express.Router();

router.post('/order', addOrder); // /api/purchase/order
router.post('/payment', addPayment); // /api/purchase/payment
router.get(
  '/order/list',
  passport.authenticate('jwt', { session: false }),
  readOrderList,
); //api/purchase/order

module.exports = router;
