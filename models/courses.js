const mongoose = require("mongoose");

const Joi = require("joi");

const schema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxLength: 255, trim: true },
    tags: [String],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    trainer: { type: String, required: true, maxLength: 255 },
    status: { type: String, enum: ["Active", "Inactive"], required: true },
    fee: { type: Number, default: 0 },
  },
  { collection: "courses" }
);

const Courses = mongoose.model("courses", schema);

function validate(courses) {
  const schema = Joi.object({
    title: Joi.string().required().max(255),
    tags: Joi.array(),
    category: Joi.string().required(),
    trainer: Joi.string().required().max(255),
    status: Joi.string(),
    fee: Joi.number(),
  });

  return schema.validate(courses);
}

exports.Courses = Courses;
exports.validate = validate;
