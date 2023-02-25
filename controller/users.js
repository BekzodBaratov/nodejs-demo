const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validatePassword } = require("../models/users");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(200).json({ success: true, message: "Users not found" });
    res.status(200).json({ succes: true, data: users });
  } catch (error) {
    res.status(400).json({ succes: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });
  const passwordError = validatePassword(req.body.password);
  if (passwordError.error) return res.status(400).json({ success: false, message: passwordError });

  try {
    const salt = await bcrypt.genSalt();
    const pwdSalt = await bcrypt.hash(req.body.password, salt);
    const userObj = { ..._.pick(req.body, ["name", "email"]), password: pwdSalt };
    const user = await User.create(userObj);

    if (!user) return res.status(200).json({ success: true, message: "Users not found" });
    res.status(200).json({ succes: true, data: _.pick(user, ["_id", "name", "email"]) });
  } catch (error) {
    res.status(400).json({ succes: false, message: error.message });
  }
});

module.exports = router;

// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ success: true, message: "User not found" });
//     res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     res.status(400).json({ succes: false, message: error.message });
//   }
// });
