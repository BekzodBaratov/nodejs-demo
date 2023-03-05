const mongoose = require("mongoose");
const winston = require("winston");

const DB = process.env.DB.replace("<password>", process.env.PASSWORD);

module.exports = function () {
  mongoose.set("strictQuery", false);
  mongoose.connect(DB, {}).then(() => winston.debug("DB connected"));
};
