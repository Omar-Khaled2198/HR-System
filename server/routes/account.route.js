var express = require('express');
var router = express.Router();

var AccountController = require("../controllers/employee/account.controller");


router.post('/sign_up',AccountController.SignUp);
router.post('/sign_in',AccountController.SignIn);
router.post('/forget_password',AccountController.ForgetPasword);
router.post('/reset_password',AccountController.ResetPassword);

module.exports = router;