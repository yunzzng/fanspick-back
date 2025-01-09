const mongoose = require("mongoose");
const Category = require("../schemas/category/category.schema");
const { MONGODB_URL } = require("../consts/app");

// db에 초기 데이터 삽입
const categories = { name: ["그립톡", "키링", "의류", "문구", "케이스"] };

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    return Category.insertMany(categories);
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
