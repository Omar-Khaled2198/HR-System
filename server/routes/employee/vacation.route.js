const express = require('express');
const Validate = require("../../middleware/validate.middleware");
const VacationController = require("../../controllers/employee/vacation.controller");
const VacationValidator = require("../../validators/vacation.validator");
var router = express.Router();

router.post('/vacations', VacationValidator.RequestVacation, Validate, VacationController.RequestVacation);
router.get("/vacations", VacationController.GetVacations);
router.put("/vacations/:vac_id", VacationController.AbortVacationRequest);

module.exports = router;