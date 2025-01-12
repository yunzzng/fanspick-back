const express = require('express');

const router = express.Router();

const {
  getProductsByIds,
} = require('../../controllers/mypage/mypage.controller');

router.get('/product-by-ids/:productId', getProductsByIds); // /api/mypage/product-by-ids
module.exports = router;
