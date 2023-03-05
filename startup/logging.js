require("express-async-errors");
const winston = require("winston");

module.exports = function () {
  winston.createLogger({
    transports: [new winston.transports.File({ filename: "logs/combined.log" }), new winston.transports.Console()],
    exceptionHandlers: [new winston.transports.File({ filename: "logs/exceptions.log" })],
    rejectionHandlers: [new winston.transports.File({ filename: "logs/rejections.log" })],
  });
};
