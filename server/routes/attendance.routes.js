const express = require("express");
const Validate = require("../middleware/validate.middleware");
const Auth = require("../middleware/auth.middleware");
const AttendanceController = require("../controllers/attandance.controller");

var router = express.Router();

router.post(
	"/check_in",
	Auth(["emplyee"]),
	AttendanceController.CheckIn
)


// router.get(
// 	"/attandance",
// 	Auth(["hr"]),
// 	SettingsController.GetSettings
// )

module.exports = router;