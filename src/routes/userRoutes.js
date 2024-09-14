// src/routes/userRoutes.js
const express = require("express");
const { sendSignUpLink } = require("../Controllers/SendUserLink");
const { signup } = require("../Controllers/userController");

const router = express.Router();

router.post("/signup", sendSignUpLink);

module.exports = router;
