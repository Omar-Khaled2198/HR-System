const express = require("express");
const Validate = require("../middleware/validate.middleware");
const Auth = require("../middleware/auth.middleware");
const SettingsController = require("../controllers/settings.controller");

var router = express.Router();


router.get(
	"/settings",
	Auth(["hr"]),
	SettingsController.GetSettings
)

router.post(
	"/settings",
	Auth(["hr"]),
	SettingsController.UpdateSettings
)

module.exports = router;