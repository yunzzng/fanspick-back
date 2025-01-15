const express = require('express');
const router = express.Router();

const {
  getProductsByIds,
} = require('../../controllers/mypage/mypage.controller');

router.get('/productbyids', getProductsByIds); // /api/mypage/product-by-ids
module.exports = router;
