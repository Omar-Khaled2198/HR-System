const express = require("express");
const Validate = require("../middleware/validate.middleware");
const AuthController = require("../controllers/auth.controller");
const AuthValidator = require("../validators/auth.validator");

var router = express.Router();

router.post("/sign_up", AuthValidator.SignUp, Validate, AuthController.SignUp);

router.post("/sign_in", AuthValidator.SignIn, Validate, AuthController.SignIn);

router.post(
	"/forget_password",
	AuthValidator.ForgetPassword,
	Validate,
	AuthController.ForgetPasword
);

router.post(
	"/reset_password",
	AuthValidator.ResetPassword,
	Validate,
	AuthController.ResetPassword
);

module.exports = router;
