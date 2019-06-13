var express = require('express');
var router = express.Router();
var Auth = require("../middleware/auth.middleware");

var AccountController = require("../controllers/account.controller");


router.post('/login',AccountController.login);
router.post('/register',AccountController.register);

module.exports = router;