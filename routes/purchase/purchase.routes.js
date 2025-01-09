const express = require("express");
const { addOrder, readOrderList } = require("../../controllers/purchase/order.controller");
const passport = require('passport');
const router = express.Router();

router.post("/order", addOrder); // /api/purchase/order
router.get("/order/list", passport.authenticate('jwt', { session: false }), readOrderList); //api/purchase/order

module.exports = router;
