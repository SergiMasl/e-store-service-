const { request } = require("express");

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

  //check on exist user
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist!");

  //save new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// router.post("/login");

module.exports = router;
