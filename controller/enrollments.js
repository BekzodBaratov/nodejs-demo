const express = require("express");
const { Enrollments, validate } = require("../models/enrollments");
const { Courses } = require("../models/courses");
const { Customers } = require("../models/customers");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollments.find().sort("-dateStart");

    res.status(200).send(enrollments);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const course = await course;
    const enrollments = await Enrollments.findById(id);
    if (!enrollments) res.status(404).send("enrollments not found");
    res.status(200).send(enrollments);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let course = await Courses.findById(req.body.course);
    if (!course) return res.status(400).send("Berilgan Id ga teng course topilmadi");

    let customer = await Customers.findById(req.body.customer);
    if (!customer) return res.status(400).send("Berilgan Id ga teng customer topilmadi");

    let enrollment = new Enrollments({
      course: { _id: course._id, title: course.title },
      customer: { _id: customer._id, name: customer.name },
      courseFee: course.fee,
    });

    if (customer.isVip) enrollment.courseFee = course.fee - 0.2 * course.fee; // vip mijozlarga 20% chegirma

    enrollment = await enrollment.save();

    customer.bonusPoints++;
    customer = await customer.save();

    res.status(201).send(enrollment);
  } catch (error) {
    res.status(500).json({ status: "failed", data: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  try {
    const enrollments = await Enrollments.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!enrollments) return res.status(404).json({ status: "enrollments not found" });
    res.status(201).json(enrollments);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
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
