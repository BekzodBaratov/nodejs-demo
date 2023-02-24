const express = require("express");
const { User, validate } = require("../models/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const search = req.query.q || "";

  try {
    const users = await User.find()
      .or([{ username: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }])
      .limit(limit)
      .skip((page - 1) * limit);
    const total = await User.find()
      .or([{ username: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }])
      .count();

    if (!users) return res.status(404).json({ status: "failed", data: "users not found" });
    res.status(200).json({ status: "success", total, limit, page, users });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ status: "failed", data: "user not found" });
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.create(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ status: "failed", data: "user not found" });
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ status: "failed", data: "user not found" });
    res.status(204).json({ status: "success" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});

module.exports = router;
