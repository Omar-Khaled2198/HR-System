var express = require('express');
const Validate = require("../middleware/validate.middleware");
var AccountController = require("../controllers/employee/account.controller");
const AccountValidator = require("../validators/account.validator");

var router = express.Router();

router.post('/sign_up', AccountValidator.SignUp, Validate, AccountController.SignUp);
router.post('/sign_in', AccountValidator.SignIn, Validate, AccountController.SignIn);
router.post('/forget_password', AccountController.ForgetPasword);
router.post('/reset_password', AccountController.ResetPassword);

module.exports = router;