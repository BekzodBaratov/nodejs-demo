const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema(
  {
    todo: { type: String, required: true },
    isComplated: { type: Boolean, default: false },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  },
  { collection: "todo" }
);

const Todo = mongoose.model("todo", schema);

function validateTodo(todo) {
  const schema = Joi.object({
    todo: Joi.string().required().max(4095),
    isComplated: Joi.boolean(),
    author: Joi.string().required(),
  });

  return schema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validateTodo;

// const mongoose = require("mongoose");
// const Joi = require("joi");

// const schema = new mongoose.Schema(
//   {
//     todo: { type: String, required: true },
//     isComplated: { type: Boolean, default: false },
//     author: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
//   },
//   { collection: "todo" }
// );

// const Todo = mongoose.model("todo", schema);

// function validateTodo(todo) {
//   const schema = Joi.object({
//     todo: Joi.string().required().max(4095),
//     isComplated: Joi.boolean(),
//     author: Joi.string().required(),
//   });

//   return schema.validate(todo);
// }

// exports.Todo = Todo;
// exports.validate = validateTodo;
