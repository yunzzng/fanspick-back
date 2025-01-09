require("./db_init");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBSessionStore = require("connect-mongodb-session")(session);
const { SESSION_SECRET, MONGODB_URL } = require("./consts/app");
const oauthRoutes = require("./routes/oauth/oauth.routes");
const managerRoutes = require("./routes/manager/manager.routes");
const purchaseRoutes = require("./routes/purchase/purchase.routes");
const reviewRoutes = require("./routes/review/review.routes");

// ============= passport ============= 
require("./passport/jwt.strategy");
require("./passport/google.strategy");
require("./passport/kakao.strategy");
require("./passport/naver.strategy");
// ====================================

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(
  session({
    secret: SESSION_SECRET,
    cookie: {
      httpOnly: true,
      maxAge: 10 * 1000,
    },
    store: new MongoDBSessionStore({
      uri: MONGODB_URL,
    }),
  })
);

// 라우터
app.use("/api/oauth", oauthRoutes);
app.use("/api/manager", managerRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/review", reviewRoutes);

module.exports = app;
