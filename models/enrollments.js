const mongoose = require("mongoose");

const Joi = require("joi");
const { Customers } = require("./customers");

const schema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({ name: { type: String, required: true, maxLength: 255, trim: true } }),
    required: true,
  },
  course: {
    type: new mongoose.Schema({
      title: { type: String, required: true, maxLength: 255, trim: true },
    }),
    required: true,
  },
  dateStart: { type: Date, required: true, default: Date.now },
  courseFee: { type: Number, min: 0, max: 9999999999 },
});

const Enrollments = mongoose.model("enrollments", schema);

function validate(courses) {
  const schema = Joi.object({
    customer: Joi.string().required(),
    course: Joi.string().required(),
  });

  return schema.validate(courses);
}

exports.Enrollments = Enrollments;
exports.validate = validate;
