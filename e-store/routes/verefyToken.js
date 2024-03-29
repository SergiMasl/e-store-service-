const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("access denied");

  try {
    const verefied = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verefied;
    next();
  } catch (err) {
    res.status(400).send("invalid Token");
  }
};
