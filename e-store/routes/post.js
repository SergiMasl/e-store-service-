const router = require("express").Router();
const User = require("../model/User");
const verify = require("./verefyToken");

router.get("/", verify, (req, res) => {
  res.json({ post: { title: "my first", descr: "rand" } });
  //res.send(req.user)
  //   User.findbyOne({ _id: req.user });
});

module.exports = router;
