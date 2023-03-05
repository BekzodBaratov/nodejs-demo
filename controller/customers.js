const express = require("express");
const { Customers, validate } = require("../models/customers");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customers.find();
  res.status(200).send(customers);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customers = await Customers.findById(id);
  if (!customers) res.status(404).send("customers not found");
  res.status(200).send(customers);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customers = await Customers.create(req.body);
  res.status(201).send(customers);
});

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const customers = await Customers.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!customers) return res.status(404).json({ status: "customers not found" });
  res.status(201).json(customers);
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const customers = await Customers.findByIdAndRemove(id);
  if (!customers) return res.status(404).json({ status: "customers not found" });
  res.status(204).json({ status: "success" });
});

module.exports = router;
