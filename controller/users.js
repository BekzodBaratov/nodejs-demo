const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const auth = require("../middleware/auth");
const { User, validate, validatePassword } = require("../models/users");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: true, message: "User not found" });
    res.status(200).json({ success: true, data: user });
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
    const userObj = { ..._.pick(req.body, ["name", "email", "isAdmin"]), password: pwdSalt };
    const user = await User.create(userObj);

    if (!user) return res.status(200).json({ success: true, message: "Users not found" });

    const token = user.generateAuthToken();
    res
      .status(200)
      .header("x-auth-token", token)
      .json({ succes: true, data: _.pick(user, ["_id", "name", "email", "isAdmin"]) });
  } catch (error) {
    res.status(400).json({ succes: false, message: error.message });
  }
});

module.exports = router;
