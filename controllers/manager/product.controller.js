const { Category } = require('../../schemas/category/category.schema');

const {
  createProduct,
  findAllProduct,
  findProductById,
  updateProductById,
  deleteProductById,
  findAllProductByUser,
  findProductCategory,
} = require('../../service/product/product.service');
/* 상품 등록 */
const addProduct = async (req, res) => {
  try {
    const {
      userId,
      name,
      price,
      introduce,
      image,
      detailImage,
      categoryIndex,
    } = req.body;
    console.log('managerId ', req.body);
    // console.log('detailImage ', detailImage);
    if (
      !userId ||
      !name ||
      !price ||
      !introduce ||
      !image ||
      !detailImage.length ||
      categoryIndex === undefined ||
      categoryIndex === null
    ) {
      return res
        .status(400)
        .json({ message: '입력이 안된 필드값이 있습니다.' });
    }
    const categories = await Category.find();

    /* 상품등록에서 선택한 카테고리 index를 DB에 저장된 첫번째 카테고리 name 배열 index에 넣기 */
    const resultCategoryName = categories[0].name[categoryIndex];
    console.log('categories ', categories);
    console.log('resultCategoryName ', resultCategoryName);
    if (!resultCategoryName) {
      return res
        .status(400)
        .json({ message: '유효하지 않은 카테고리 인덱스입니다.' });
    }
    const resultCategory = { name: resultCategoryName };

    console.log('resultCategory ', resultCategory);
    const createResult = await createProduct({
      userId,
      name,
      price,
      introduce,
      image,
      detailImage,
      category: resultCategory,
    });

    res
      .status(201)
      .json({ data: createResult, message: '상품 등록 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
/* 모든 상품 조회 */
// const getAllProduct = async (req, res) => {
//   try {
//     const product = await findAllProduct();
//     if (!product) {
//       return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
//     }

//     res.status(200).json({
//       message: '모든상품 조회완료',
//       product: product.map((item) => ({
//         userId: item.userId,
//         _id: item._id,
//         name: item.name,
//         price: item.price,
//         introduce: item.introduce,
//         image: item.image,
//         detailImage: item.detailImage,
//         category: { name: item.category.name },
//       })),
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: err.message });
//   }
// };
/* 모든 상품 조회 */
const getAllProduct = async (req, res) => {
  try {
    const { userId, page, itemsPerPage } = req.query;
    console.log('userId ', userId);
    const { products, totalCount } = await findAllProductByUser(
      userId,
      page,
      itemsPerPage,
    );
    if (!products) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }
    // console.log('products ', products);

    res.status(200).json({
      message: '모든상품 조회완료',
      product: products.map((item) => ({
        userId: item.userId,
        _id: item._id,
        name: item.name,
        price: item.price,
        introduce: item.introduce,
        image: item.image,
        detailImage: item.detailImage,
        category: { name: item.category.name },
      })),
      totalCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
/* 상품 조회(카테고리 & 페이지네이션) */
const getProductCategory = async (req, res) => {
  try {
    const { page, itemsPerPage, category } = req.query;
    const { product, totalCount } = await findProductCategory(
      page,
      itemsPerPage,
      category,
    );
    if (!product) {
      return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });
    }

    res.status(200).json({
      message: '모든상품 조회완료',
      product: product.map((item) => ({
        userId: item.userId,
        _id: item._id,
        name: item.name,
        price: item.price,
        introduce: item.introduce,
        image: item.image,
        detailImage: item.detailImage,
        category: { name: item.category.name },
      })),
      totalCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
/* 모든 상품 조회(페이지네이션) */
const getAllProductByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page, itemsPerPage } = req.query;

    const { products, totalCount } = await findAllProductByUser(
      userId,
      page,
      itemsPerPage,
    );

    res.status(200).json({
      message: '모든 상품 조회 성공',
      userId,
      products,
      totalCount,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

/* 단일 상품 조회 */
const getProduct = async (req, res) => {
  try {
    const product = await findProductById(req.params.id);
    if (product === null) {
      return res
        .status(400)
        .json({ message: '잘못된 상품 데이터 요청 입니다.' });
    }
    const { _id, name, price, introduce, image, detailImage, category } =
      product;

    res.status(200).json({
      product: {
        _id,
        name,
        price,
        introduce,
        image,
        detailImage,
        category: { name: category.name },
      },
      message: '상품 상세조회 성공',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
/* 단일 상품 수정 */
const updateProduct = async (req, res) => {
  try {
    const {
      _id,
      userId,
      name,
      price,
      introduce,
      image,
      detailImage,
      categoryIndex,
    } = req.body;
    console.log('update object ', req.body);

    if (
      !_id ||
      !userId ||
      !name ||
      !price ||
      !introduce ||
      !image ||
      !detailImage.length ||
      categoryIndex === undefined ||
      categoryIndex === null
    ) {
      return res
        .status(400)
        .json({ message: '입력이 안된 필드값이 있습니다.' });
    }

    const categories = await Category.find();

    /* 상품등록에서 선택한 카테고리 index를 DB에 저장된 첫번째 카테고리 name 배열 index에 넣기 */
    const resultCategoryName = categories[0].name[categoryIndex];
    // console.log('categories ', categories);
    // console.log('resultCategoryName ', resultCategoryName);
    if (!resultCategoryName) {
      return res
        .status(400)
        .json({ message: '유효하지 않은 카테고리 인덱스입니다.' });
    }
    const resultCategory = { name: resultCategoryName };

    const updateResult = await updateProductById({
      _id,
      userId,
      name,
      price,
      introduce,
      image,
      detailImage,
      category: resultCategory,
    });
    // console.log('updateResult ', updateResult);
    res.status(204).json({ message: '상품 수정 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
/* 단일 상품 삭제 */
const deleteProduct = async (req, res) => {
  try {
    const deleted = await deleteProductById(req.params.id);
    res.status(204).json({ message: '상품 삭제 완료되었습니다.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getProductCategory,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProductByUserId,
};
