var express = require('express');
var router = express.Router();
var Auth = require("../middleware/auth.middleware");

var AccountController = require("../controllers/account.controller");


router.post('/login',AccountController.Login);
router.post('/register',AccountController.Register);

module.exports = router;