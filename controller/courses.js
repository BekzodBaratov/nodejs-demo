const express = require("express");
const { Courses, validate } = require("../models/courses");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const courses = await Courses.find().populate("category", "name");
    res.status(200).send(courses);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const courses = await Courses.findById(id).populate("category", "name");
    if (!courses) res.status(404).send("courses not found");
    res.status(200).send(courses);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const courses = await Courses.create(req.body);
    res.status(201).send(courses);
  } catch (error) {
    res.status(500).json({ status: "failed", data: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const courses = await Courses.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!courses) return res.status(404).json({ status: "courses not found" });
    res.status(201).json(courses);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const courses = await Courses.findByIdAndRemove(id);
    if (!courses) return res.status(404).json({ status: "courses not found" });
    res.status(204).json({ status: "success" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
