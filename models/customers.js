const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 255, trim: true },
});

const Customers = mongoose.model("customers", schema);

function validate(courses) {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
  });

  return schema.validate(courses);
}

exports.Customers = Customers;
exports.validate = validate;
