const { Category } = require("../../schemas/category/category.schema");
const {
  createProduct,
  findAllProduct,
} = require("../../service/product/product.service");

const addProduct = async (req, res) => {
  try {
    const { name, price, introduce, image, detailImage, categoryIndex } =
      req.body;
    console.log("categoryIndex ", categoryIndex);
    console.log("detailImage ", detailImage);

    if (
      !name ||
      !price ||
      !introduce ||
      !image ||
      !detailImage ||
      !categoryIndex
    ) {
      return res
        .status(400)
        .json({ message: "입력이 안된 필드값이 있습니다." });
    }
    const categories = await Category.find();

    /* 상품등록에서 선택한 카테고리 index를 DB에 저장된 첫번째 카테고리 name 배열 index에 넣기 */
    const resultCategoryName = categories[0].name[categoryIndex];
    console.log("categories ", categories);
    console.log("resultCategoryName ", resultCategoryName);
    if (!resultCategoryName) {
      return res
        .status(400)
        .json({ message: "유효하지 않은 카테고리 인덱스입니다." });
    }
    const resultCategory = { name: resultCategoryName };

    console.log("resultCategory ", resultCategory);
    const createResult = await createProduct({
      name,
      price,
      introduce,
      image,
      detailImage,
      category: resultCategory,
    });

    if (createResult) {
      return res
        .status(200)
        .json({ data: createResult, message: "상품 등록 완료되었습니다." });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await findAllProduct();
    if (!product) {
      return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
    }
    console.log("product ", product);
    res.status(200).json({
      message: "모든상품 조회완료",
      product: product.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        introduce: item.introduce,
        image: item.image,
        detailImage: item.detailImage,
        category: { name: item.category.name },
      })),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};
module.exports = {
  addProduct,
  getAllProduct,
};
