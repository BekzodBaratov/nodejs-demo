const express = require("express");
const { Todo, validate } = require("../models/todo");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find().populate("author", "username -_id");
    res.status(200).send(todo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id).populate("author", "username -_id");
    if (!todo) res.status(404).send("todo not found");
    res.status(200).send(todo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const todo = await Todo.create(req.body);
    res.status(201).send(todo);
  } catch (error) {
    res.status(500).json({ status: "failed", data: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!todo) return res.status(404).json({ status: "todo not found" });
    res.status(201).json(todo);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndRemove(id);
    if (!todo) return res.status(404).json({ status: "todo not found" });
    res.status(204).json({ status: "success" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
