var express = require('express');
var router = express.Router();


var VacationController = require("../controllers/employee/vacation.controller");


router.post('/:id/vacation/create',VacationController.RequestVacation);
router.get("/:id/vacations",VacationController.GetVacations);
router.post("/:id/vacation/:vac_id",VacationController.AbortVacationRequest);

module.exports = router;