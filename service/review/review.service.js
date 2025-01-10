const Review = require('../../schemas/review/review.schema');

// 리뷰 등록
const createReview = async (reviewData) => {
  const newReview = new Review(reviewData);
  return await newReview.save();
};

// 리뷰 조회(상세페이지)
const findReviewsByProduct = async (productId) => {
  return await Review.find({ productId }).populate(
    'userId',
    'name profileImage',
  );
};

module.exports = {
  createReview,
  findReviewsByProduct,
};
