// src/routes/userRoutes.js
const express = require("express");
const {
  sendSignUpLink,
  completeSignUp,
} = require("../Controllers/SendUserLink");
const { signup } = require("../Controllers/userController");

const router = express.Router();

router.post("/signup", sendSignUpLink);
router.get("/complete-signup", completeSignUp);

module.exports = router;
