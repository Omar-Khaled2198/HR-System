var express = require('express');
var router = express.Router();

var AccountController = require("../controllers/employee/account.controller");


router.post('/login',AccountController.Login);
router.post('/register',AccountController.Register);
router.post('/forget_password',AccountController.ForgetPasword);
router.post('/reset_password',AccountController.ResetPassword);

module.exports = router;