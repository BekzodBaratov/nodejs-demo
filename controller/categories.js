const express = require("express");
const { Categories, validate } = require("../models/categories");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Categories.find();
  res.status(200).send(categories);
});

router.get("/:id", async (req, res) => {
  // new throw Error
  const id = req.params.id;
  const categories = await Categories.findById(id);
  if (!categories) res.status(404).send("categories not found");
  res.status(200).send(categories);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const categories = await Categories.create(req.body);
  res.status(201).send(categories);
});

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const categories = await Categories.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!categories) return res.status(404).json({ status: "categories not found" });
  res.status(201).json(categories);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const id = req.params.id;
  const category = await Categories.findByIdAndRemove(id);
  if (!category) return res.status(404).json({ success: false, message: "category not found" });
  res.status(200).json({ success: true, data: category });
});

module.exports = router;
