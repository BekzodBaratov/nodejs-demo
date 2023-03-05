const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const { User } = require("../models/users");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(200).json({ success: true, message: "Users not found" });
  res.status(200).json({ succes: true, data: users });
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ success: false, massage: "Email yoki parol noto'g'ri" });

  const isValidPassword = await bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) return res.status(400).json({ success: false, massage: "Email yoki parol noto'g'ri" });

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(true);
});

const validate = function (req) {
  const schema = Joi.object({
    email: Joi.string().required().max(64).min(5).email(),
    password: Joi.string().required().max(255).min(4),
  });
  return schema.validate(req);
};

module.exports = router;
