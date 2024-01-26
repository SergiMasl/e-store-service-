const { request } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();
const User = require("../model/User");

//validation
// const Joi = require("@hapi/joi");

// const schema = {
//   name: Joi.string().min(6).required(),
//   email: Joi.string().min(6).required().email(),
//   password: Joi.string().min(6).required(),
// };

router.post("/register", async (req, res) => {
  //validate data before user
  //   const validation = new Joi.ValidationError(req.body, schema);
  //   res.send(validation);
  console.log(req.body);
  //check on exist user
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist!");

  //hash password

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.psd, salt);

  //save new user
  const user = new User({
    // name: req.body.name,
    email: req.body.email,
    psd: hashPassword,
  });
  try {
    const saveUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post("/login", async (req, res) => {
  //login validation (49)

  //checkin if exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("wrond");

  const validPass = await bcrypt.compare(req.body.psd, user.psd);
  if (!validPass) return res.status(400).send("Invalid password");

  //create token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.set("auth-jwt-token", "token").json({
    token: token,
  });
});

module.exports = router;
