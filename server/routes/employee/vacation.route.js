var express = require('express');
var router = express.Router();


var VacationController = require("../../controllers/employee/vacation.controller");


router.post('/:id/vacations',VacationController.RequestVacation);
router.get("/:id/vacations",VacationController.GetVacations);
router.put("/:id/vacations/:vac_id",VacationController.AbortVacationRequest);

module.exports = router;