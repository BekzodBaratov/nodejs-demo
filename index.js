require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");
const AdminBro = require("admin-bro");
const app = express();
const errorMiddleware = require("./middleware/error");

winston.add(new winston.transports.File({ filename: "virtualdars-logs.log" }));
if (!config.get("jwtPrivateKey")) {
  console.error("JIDDIY XATO: virtualdars_jwtprivatekey muhit o'zgaruvchisi aniqlanmagan");
  process.exit(1);
}

const categoryRoute = require("./controller/categories");
const courseRoute = require("./controller/courses");
const customersRoute = require("./controller/customers");
const enrollmentsRoute = require("./controller/enrollments");
const usersRoute = require("./controller/users");
const authRoute = require("./controller/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/customers", customersRoute);
app.use("/api/v1/enrollments", enrollmentsRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);
app.use(errorMiddleware);

const DB = process.env.DB.replace("<password>", process.env.PASSWORD);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {})
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(`DB : ${err}`));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port " + port));
