const router = require("express").Router();

const auth = require("../controllers/auth.controller");

router
  .post("/register", auth.register)
  .post("/login", auth.login)

module.exports = router;
