const express = require("express");
const { addOrder } = require("../../controllers/purchase/order.controller");

const router = express.Router();

router.post("/order", addOrder); // /api/purchase/order

module.exports = router;
