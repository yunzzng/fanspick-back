const Review = require("../../schemas/review/review.schema");

const createReview = async (reviewData) => {
  const newReview = new Review(reviewData);
  return await newReview.save();
};

module.exports = {
  createReview,
};