const express = require("express");
const passport = require("passport");
const { addReview, getReviewsByProduct } = require("../../controllers/review/review.controller");
const router = express.Router();

// 리뷰 등록
router.post("/add", passport.authenticate("jwt", { session: false }), addReview); // /api/review/add

// 리뷰 조회(상세피이지)
router.get("/product/:productId", passport.authenticate("jwt", { session: false }), getReviewsByProduct);

module.exports = router;