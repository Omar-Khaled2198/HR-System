const express = require("express");
const Validate = require("../middleware/validate.middleware");
const Auth = require("../middleware/auth.middleware");
const VacationController = require("../controllers/vacation.controller");
var router = express.Router();

router.post(
	"/vacations",
	Auth(["hr", "employee"]),
	VacationController.CreateVacation
);

router.get(
	"/vacations",
	Auth(["hr", "employee"]),
	VacationController.GetAllVacations
);

router.get(
	"/vacations/:vacation_id",
	Auth(["hr", "employee"]),
	VacationController.GetVacation
);

router.put(
	"/vacations/:vacation_id",
	Auth(["hr", "employee"]),
	VacationController.UpdateVacation
);

router.delete(
	"/vacations/:vacation_id",
	Auth(["hr"]),
	VacationController.DeleteVacation
);

module.exports = router;