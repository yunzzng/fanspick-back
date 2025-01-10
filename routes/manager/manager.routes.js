const express = require('express');

const {
  addProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductsByIds,
} = require('../../controllers/manager/product.controller');
const {
  getAllCategory,
} = require('../../controllers/category/category.controller');

const router = express.Router();

router.post('/product', addProduct); // /api/manager/product
router.get('/get-all-product', getAllProduct); // /api/manager/get-all-product
router.get('/product/:id', getProduct); // /api/manager/product/:id
router.get('/product-by-ids', getProductsByIds); // /api/manager/product-by-ids
router.get('/category', getAllCategory); // /api/manager/category
router.put('/update', updateProduct); // /api/manager/update
router.delete('/delete/:id', deleteProduct); // /api/manager/delete/:id
module.exports = router;
