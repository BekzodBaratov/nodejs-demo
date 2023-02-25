const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const passwordComplexity = require("joi-password-complexity");

const schema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 64, minLength: 3 },
  email: { type: String, required: true, maxLength: 64, minLength: 5, unique: true },
  password: { type: String, required: true, maxLength: 255, minLength: 4 },
});

schema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", schema);

const validate = function (user) {
  const schema = Joi.object({
    name: Joi.string().required().max(64).min(3),
    email: Joi.string().required().max(64).min(5).email(),
    password: Joi.string().required().max(255).min(4),
  });
  return schema.validate(user);
};
const validatePassword = (password) => {
  return passwordComplexity().validate(password);
};

exports.User = User;
exports.validate = validate;
exports.validatePassword = validatePassword;
