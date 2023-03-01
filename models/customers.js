const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  name: { type: String, required: true, maxLength: 255, trim: true },
  isVip: { type: Boolean, required: true, default: false },
  phone: { type: String, required: true, maxLength: 64, trim: true },
  bonusPoints: { type: Number, default: 0 },
});

const Customers = mongoose.model("customers", schema);

function validate(courses) {
  const schema = Joi.object({
    name: Joi.string().required().max(255),
    phone: Joi.string().required().max(255),
    isVip: Joi.bool(),
  });

  return schema.validate(courses);
}

exports.Customers = Customers;
exports.validate = validate;
