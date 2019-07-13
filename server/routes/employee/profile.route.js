var express = require('express');
var router = express.Router();

var ProfileController = require("../../controllers/employee/profile.controller");
var Upload = require("../../middleware/file.midldeware");

router.post('/',ProfileController.CreateProfile);
router.get('/',ProfileController.GetProfile);
router.post('/profile_picture',Upload.single("profile_picture"),ProfileController.UploadProfileImage);

module.exports = router;