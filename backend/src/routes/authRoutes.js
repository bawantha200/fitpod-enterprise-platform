const express = require("express");
const router = express.Router();


const validateRequest = require("../middleware/validateRequest");
const { loginValidator } = require("../validators/commonValidators");
const authController = require("../services/authController");

router.post("/register", authController.register);

router.post("/login", loginValidator, validateRequest, authController.login);

router.get("/me", authController.getMe);

module.exports = router;