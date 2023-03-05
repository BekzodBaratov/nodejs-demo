const express = require("express");
const errorMiddleware = require("../middleware/error");

const categoryRoute = require("../controller/categories");
const courseRoute = require("../controller/courses");
const customersRoute = require("../controller/customers");
const enrollmentsRoute = require("../controller/enrollments");
const usersRoute = require("../controller/users");
const authRoute = require("../controller/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/courses", courseRoute);
  app.use("/api/v1/customers", customersRoute);
  app.use("/api/v1/enrollments", enrollmentsRoute);
  app.use("/api/v1/users", usersRoute);
  app.use("/api/v1/auth", authRoute);
  app.use(errorMiddleware);
};
