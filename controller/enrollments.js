const express = require("express");
const { Enrollments, validate } = require("../models/enrollments");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollments.find()
      .sort("-dateStart")
      .populate("customer", "name")
      .populate("course", "title");

    res.status(200).send(enrollments);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const enrollments = await Enrollments.findById(id).populate("category", "name");
    if (!enrollments) res.status(404).send("enrollments not found");
    res.status(200).send(enrollments);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const enrollments = await Enrollments.create(req.body);
    res.status(201).send(enrollments);
  } catch (error) {
    res.status(500).json({ status: "failed", data: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const enrollments = await Enrollments.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!enrollments) return res.status(404).json({ status: "enrollments not found" });
    res.status(201).json(enrollments);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const enrollments = await Enrollments.findByIdAndRemove(id);
    if (!enrollments) return res.status(404).json({ status: "enrollments not found" });
    res.status(204).json({ status: "success" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
