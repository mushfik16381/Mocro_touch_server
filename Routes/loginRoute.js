const express = require("express");
const router = express.Router();

const { loginUser, signup } = require("../controller/loginController");

router.post("/login", loginUser);
router.post("/signup", signup);

module.exports = router;