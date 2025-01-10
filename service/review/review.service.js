const Review = require('../../schemas/review/review.schema');

// 리뷰 등록
const createReview = async (reviewData) => {
  const newReview = new Review(reviewData);
  return await newReview.save();
};

// 리뷰 조회(상세페이지)
const findReviewsByProduct = async (productId, page, itemsPerPage) => {
  try {
    const limit = itemsPerPage; 
    const skip = (page - 1) * limit; 

    const reviews = await Review.find({ productId })
      .populate('userId', 'name profileImage')
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    const totalCount = await Review.countDocuments({ productId });

    return { reviews, totalCount };
  } catch (error) {
    console.error("[ReadReviewsByProduct] Error:", error);
    throw new Error("리뷰 조회에 실패했습니다.", { cause: error });
  }
};

module.exports = {
  createReview,
  findReviewsByProduct,
};
