const express = require("express");

const { addProduct } = require("../../controllers/manager/product.controller");

const router = express.Router();

router.post("/product", addProduct); // /api/manager/product

module.exports = router;
