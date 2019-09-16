const express = require('express');
const Validate = require("../../middleware/validate.middleware");
const ProfileController = require("../../controllers/employee/profile.controller");
const Upload = require("../../middleware/file.midldeware");
const ProfileValidator = require('../../validators/profile.validator');
var router = express.Router();

router.post('/profile', ProfileValidator.CreateProfile, Validate, ProfileController.CreateProfile);
router.get('/profile', ProfileController.GetProfile);
router.put("/profile", ProfileController.UpdateProfile);
router.post('/profile_picture',Upload.single("profile_picture"),ProfileController.UploadProfileImage);

module.exports = router;