const express = require("express");

const login = require("../controllers/Login");
const createUser = require("../controllers/Signup");

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", login);
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
module.exports = router;
