const {
  createReview,
  findReviewsByProduct,
  findReviewsByUser,
  findReviewById,
  deleteReviewById,
  updateReviewById,
} = require('../../service/review/review.service');
const { createError } = require('../../utils/error');

const addReview = async (req, res, next) => {
  try {
    const { productId, title, content, starpoint, images, orderId } = req.body;
    const userId = req.user.id; // JWT로부터 디코딩된 유저 ID

    if (!productId || !title || !content || !starpoint || !images) {
      // return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
      throw createError(400, '모든 필드를 입력해주세요.');
    }

    const newReview = await createReview({
      userId,
      productId,
      title,
      content,
      image: images,
      starpoint,
      orderId,
    });

    res.status(201).json({
      message: '리뷰가 성공적으로 등록되었습니다.',
      review: newReview,
    });
  } catch (err) {
    console.error('리뷰 등록 오류:', err);
    // res.status(500).json({ message: '리뷰 등록 중 서버 오류가 발생했습니다.' });
    next(err);
  }
};

// 리뷰 조회 (상세페이지)
const getReviewsByProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { page, itemsPerPage } = req.query;

    const { reviews, totalCount } = await findReviewsByProduct(
      productId,
      page,
      itemsPerPage,
    );

    res.status(200).json({
      isError: false,
      message: '리뷰 목록 조회에 성공했습니다.',
      productId,
      reviews,
      totalCount,
    });
  } catch (err) {
    console.error('리뷰 조회 중 에러: ', err.message);
    // res.status(500).json({
    //   isError: true,
    //   message: '리뷰 조회에 실패했습니다.',
    // });
    next(err);
  }
};

// 리뷰 조회 (마이페이지)
const getReviewsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { page, itemsPerPage } = req.query;

    console.log('전달된 userId:', userId);
    const { reviews, totalCount } = await findReviewsByUser(
      userId,
      page,
      itemsPerPage,
    );

    res.status(200).json({
      message: '유저 리뷰 목록 가져오기 성공!',
      reviews,
      totalCount,
    });
  } catch (err) {
    console.error('유저 리뷰 가져오기 오류:', err);
    // res
    //   .status(500)
    //   .json({ message: '유저 리뷰 가져오는 중 서버 오류가 발생했습니다.' });
    next(err);
  }
};

// 리뷰 ID 조회(단일)
const getReviewById = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await findReviewById(reviewId);

    if (!review) {
      // return res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
      throw createError(404, '리뷰를 찾을 수 없습니다.');
    }

    res.status(200).json({ message: '리뷰 가져오기 성공', review });
  } catch (err) {
    console.error('리뷰 가져오기 오류:', err);
    // res
    //   .status(500)
    //   .json({ message: '리뷰 가져오는 중 서버 오류가 발생했습니다.' });
    next(err);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const updatedData = req.body;

    const updatedReview = await updateReviewById(reviewId, updatedData);

    if (!updatedReview) {
      // return res.status(404).json({ message: "리뷰를 찾을 수 없습니다." });
      throw createError(404, '리뷰를 찾을 수 없습니다.');
    }

    res
      .status(200)
      .json({ message: '리뷰 업데이트 성공!', review: updatedReview });
  } catch (err) {
    console.error('리뷰 업데이트 오류:', err);
    // res.status(500).json({ message: "리뷰 업데이트 중 서버 오류가 발생했습니다." });
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const deletedReview = await deleteReviewById(reviewId);

    if (!deletedReview) {
      // return res.status(404).json({ message: '리뷰를 찾을 수 없습니다.' });
      throw createError(404, '리뷰를 찾을 수 없습니다.');
    }

    res.status(200).json({ message: '리뷰 삭제 성공', review: deletedReview });
  } catch (err) {
    console.error('리뷰 삭제 오류:', err);
    // res.status(500).json({ message: '리뷰 삭제 중 서버 오류가 발생했습니다.' });
    next(err);
  }
};

module.exports = {
  addReview,
  getReviewsByProduct,
  getReviewsByUser,
  getReviewById,
  updateReview,
  deleteReview,
};
