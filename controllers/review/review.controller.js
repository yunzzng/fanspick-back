const {
  createReview,
  findReviewsByProduct,
} = require('../../service/review/review.service');

const addReview = async (req, res) => {
  try {
    const { productId, title, content, starpoint, images } = req.body;
    const userId = req.user.id; // JWT로부터 디코딩된 유저 ID

    if (!productId || !title || !content || !starpoint || !images) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    const newReview = await createReview({
      userId,
      productId,
      title,
      content,
      image: images,
      starpoint,
    });

    res.status(201).json({
      message: '리뷰가 성공적으로 등록되었습니다.',
      review: newReview,
    });
  } catch (error) {
    console.error('리뷰 등록 오류:', error);
    res.status(500).json({ message: '리뷰 등록 중 서버 오류가 발생했습니다.' });
  }
};

// 리뷰 조회 (상세페이지)
const getReviewsByProduct = async (req, res) => {
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
  } catch (error) {
    console.error('리뷰 조회 중 에러: ', error.message);
    res.status(500).json({
      isError: true,
      message: '리뷰 조회에 실패했습니다.',
    });
  }
};

module.exports = {
  addReview,
  getReviewsByProduct,
};
