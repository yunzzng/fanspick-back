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
router.get('/get-all-product', getAllProduct); // /api/manager/get-all-product
router.get('/product/:id', getProduct); // /api/manager/product/:id
router.get('/category', getAllCategory); // /api/manager/category
router.put('/update', updateProduct); // /api/manager/update
router.delete('/delete/:id', deleteProduct); // /api/manager/delete/:id
module.exports = router;
