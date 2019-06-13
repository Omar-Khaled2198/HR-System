var express = require('express');
var router = express.Router();
var Auth = require("../middleware/auth.middleware");

var UserController = require("../controllers/user.controller");


router.post('/login',UserController.login);
router.post('/register',UserController.register);

module.exports = router;