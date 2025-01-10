const express = require('express');
const passport = require('passport');
const {
  addReview,
  getReviewsByProduct,
  getReviewsByUser,
  updateReview,
  deleteReview,
  getReviewById,
} = require('../../controllers/review/review.controller');
const router = express.Router();

// 리뷰 등록
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  addReview,
); // /api/review/add

// 리뷰 조회(단일)
router.get(
  '/:reviewId',
  passport.authenticate('jwt', { session: false }),
  getReviewById,
);

// 리뷰 조회(상세피이지)
router.get(
  '/product/:productId',
  passport.authenticate('jwt', { session: false }),
  getReviewsByProduct,
);

// 리뷰 조회(마이페이지)
router.get(
  '/user/:userId',
  passport.authenticate('jwt', { session: false }),
  getReviewsByUser,
);

// 리뷰 수정
router.put(
  '/:reviewId',
  passport.authenticate('jwt', { session: false }),
  updateReview,
);

// 리뷰 사제
router.delete(
  '/:reviewId',
  passport.authenticate('jwt', { session: false }),
  deleteReview,
);
module.exports = router;
