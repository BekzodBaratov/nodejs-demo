const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema(
  {
    username: { type: String, minLength: 3, maxLength: 50, required: true },
    password: { type: String, minLength: 4, maxLength: 50, required: true },
    email: { type: String, minLength: 5, maxLength: 63, required: true },
    role: { type: String, default: "user", enum: ["user", "admin", "creator"] },
    isVip: {
      type: Boolean,
      default: function () {
        return this.role !== "user";
      },
    },
  },
  { collection: "user" }
);

const User = mongoose.model("user", schema);

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(4).max(50).required(),
    email: Joi.string().min(5).max(63).required(),
    isVip: Joi.boolean(),
    role: Joi.string(),
  });

  return schema.validate(user);
};

exports.validate = validateUser;
exports.User = User;
