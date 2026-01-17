const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  checkUsernamePrefix,
} = require("../Controller/userController.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/check-username-prefix',checkUsernamePrefix );
module.exports = router;
