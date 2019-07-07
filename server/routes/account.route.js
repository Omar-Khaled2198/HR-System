var express = require('express');
var router = express.Router();

var AccountController = require("../controllers/employee/account.controller");


router.post('/login',AccountController.Login);
router.post('/register',AccountController.Register);

module.exports = router;