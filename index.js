require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const todoRoute = require("./controller/todo");
const userRoute = require("./controller/user");
const categoryRoute = require("./controller/categories");
const courseRoute = require("./controller/courses");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/todo", todoRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/courses", courseRoute);

const DB = process.env.DB.replace("<password>", process.env.PASSWORD);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(`DB error: ${err}`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port " + port));
