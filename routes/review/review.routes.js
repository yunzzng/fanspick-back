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
// router.post(
//   '/add',
//   passport.authenticate('jwt', { session: false }),
//   addReview,
// ); // /api/review/add
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    // 요청 데이터 콘솔 출력
    console.log('리뷰 데이터 요청:', req.body);

    // addReview 핸들러 호출
    addReview(req, res, next);
  }
);

// 리뷰 조회(단일) > 수정페이지
router.get(
  '/:reviewId',
  passport.authenticate('jwt', { session: false }),
  getReviewById,
);

// 리뷰 조회(상품상세피이지)
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
