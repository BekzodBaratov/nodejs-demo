const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, minLength: 4, maxLength: 255 },
    desc: { type: String, required: true, minLength: 4, maxLength: 255 },
  },
  { collection: "categories" }
);

const Categories = mongoose.model("categories", schema);

function validate(categories) {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(255),
    desc: Joi.string().required().min(4).max(255),
  });

  return schema.validate(categories);
}

exports.Categories = Categories;
exports.validate = validate;
