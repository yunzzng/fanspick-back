const express = require('express');
const passport = require('passport');

const {
  addProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCategory,
} = require('../../controllers/manager/product.controller');
const {
  getAllCategory,
} = require('../../controllers/category/category.controller');

const router = express.Router();

router.post(
  '/product',
  passport.authenticate('jwt', { session: false }),
  addProduct,
); // /api/manager/product

router.get(
  '/products',
  passport.authenticate('jwt', { session: false }),
  getAllProduct,
); // /api/manager/products

router.get('/products-category', getProductCategory); // /api/manager/products-category

router.get('/product/:id', getProduct); // /api/manager/product/:id

router.get(
  '/category',
  passport.authenticate('jwt', { session: false }),
  getAllCategory,
); // /api/manager/category

router.put(
  '/product',
  passport.authenticate('jwt', { session: false }),
  updateProduct,
); // /api/manager/product

router.delete(
  '/product/:id',
  passport.authenticate('jwt', { session: false }),
  deleteProduct,
); // /api/manager/product/:id

// router.get('/product/:id', getAllProductByUserId); // /api/manager/product/:id

module.exports = router;
