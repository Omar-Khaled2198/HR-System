var express = require('express');
var router = express.Router();

var ProfileController = require("../controllers/employee/profile.controller");


router.post('/',ProfileController.CreateProfile);
router.get('/',ProfileController.GetProfile);

module.exports = router;