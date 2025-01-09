const express = require("express");

const {
  addProduct,
  getAllProduct,
} = require("../../controllers/manager/product.controller");
const {
  getAllCategory,
} = require("../../controllers/category/category.controller");

const router = express.Router();

router.post("/product", addProduct); // /api/manager/product
router.get("/getAllProduct", getAllProduct); // /api/manager/getAllProduct
router.get("/category", getAllCategory); // /api/manager/category
module.exports = router;
