require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./api/users/user.routes");
const favsRoute = require("./api/favoriteList/favoriteList.routes");

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use("/auth/local", userRoute);
app.use("/api/favs", favsRoute);

module.exports = app;
