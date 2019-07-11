var express = require('express');
var router = express.Router();

var ProfileController = require("../../controllers/hr/profile.controller");

router.get("/profiles",ProfileController.GetAllProfiles);


module.exports = router;