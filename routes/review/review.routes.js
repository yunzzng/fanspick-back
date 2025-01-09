const express = require("express");
const passport = require("passport");
const { addReview } = require("../../controllers/review/review.controller");
const router = express.Router();

// 리뷰 등록
router.post("/add", passport.authenticate("jwt", { session: false }), addReview); // /api/review/add

module.exports = router;