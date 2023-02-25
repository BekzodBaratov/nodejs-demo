const mongoose = require("mongoose");

const Joi = require("joi");

const schema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "customers", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },
  dateStart: { type: Date, required: true, default: Date.now() },
  courseFee: { type: Number, min: 0, max: 9999999999, required: true },
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
