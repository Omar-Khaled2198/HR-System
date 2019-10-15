const express = require("express");
const Validate = require("../middleware/validate.middleware");
const Auth = require("../middleware/auth.middleware");
const AttendanceController = require("../controllers/attendance.controller");

var router = express.Router();

router.post(
	"/check_in/:employee_id",
	Auth(["employee"]),
	AttendanceController.CheckIn
)

router.post(
	"/attendance",
	Auth(["hr"]),
	AttendanceController.CreateRecord
);

router.get(
	"/attendance",
	Auth(["hr", "employee"]),
	AttendanceController.GetAllRecords
);

router.get(
	"/attendance/:record_id",
	Auth(["hr", "employee"]),
	AttendanceController.GetRecord
);

router.put(
	"/attendance/:record_id",
	Auth(["hr"]),
	AttendanceController.UpdateRecord
);

router.delete(
	"/attendance/:record_id",
	Auth(["hr"]),
	AttendanceController.DeleteRecord
);

module.exports = router;