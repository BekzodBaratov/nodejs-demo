const express = require("express");
const { Categories, validate } = require("../models/categories");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).send(categories);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const categories = await Categories.findById(id);
    if (!categories) res.status(404).send("categories not found");
    res.status(200).send(categories);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const categories = await Categories.create(req.body);
    res.status(201).send(categories);
  } catch (error) {
    res.status(500).json({ status: "failed", data: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const categories = await Categories.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!categories) return res.status(404).json({ status: "categories not found" });
    res.status(201).json(categories);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const categories = await Categories.findByIdAndRemove(id);
    if (!categories) return res.status(404).json({ status: "categories not found" });
    res.status(204).json({ status: "success" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
