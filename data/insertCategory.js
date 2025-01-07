const mongoose = require("mongoose");
const Category = require("../schemas/category/category.schema");
const { MONGODB_URL } = require("../consts/app");

// db에 초기 데이터 삽입
const categories = [
  { id: "1", name: "그립톡" },
  { id: "2", name: "키링" },
  { id: "3", name: "의류" },
  { id: "4", name: "문구" },
  { id: "5", name: "케이스" },
];

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
