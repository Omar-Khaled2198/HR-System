var express = require('express');
var router = express.Router();
var Auth = require("../middleware/auth.middleware");

var ProfileController = require("../controllers/profile.controller");


router.post('/',Auth("*"),ProfileController.CreateProfile);
router.get('/',Auth("*"),ProfileController.GetProfile);

module.exports = router;