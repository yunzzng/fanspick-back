require("./db_init"); 
const express = require("express");
const oauthRoutes = require("./routes/oauth/oauth.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터
app.use("/api/oauth", oauthRoutes);


module.exports = app;