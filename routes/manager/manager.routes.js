const express = require('express');

const {
  addProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../../controllers/manager/product.controller');
const {
  getAllCategory,
} = require('../../controllers/category/category.controller');

const router = express.Router();

router.post('/product', addProduct); // /api/manager/product
router.get('/products', getAllProduct); // /api/manager/products
router.get('/product/:id', getProduct); // /api/manager/product/:id
router.get('/category', getAllCategory); // /api/manager/category
router.put('/product', updateProduct); // /api/manager/product
router.delete('/product/:id', deleteProduct); // /api/manager/product/:id
// router.get('/product/:id', getAllProductByUserId); // /api/manager/product/:id

module.exports = router;
