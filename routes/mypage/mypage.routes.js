const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
  getProductsByIds,
} = require('../../controllers/mypage/mypage.controller');

router.get(
  '/product-by-ids',
  passport.authenticate('jwt', { session: false }),
  getProductsByIds,
); // /api/mypage/product-by-ids
module.exports = router;
