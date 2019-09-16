var express = require('express');
var router = express.Router();


var VacationController = require("../../controllers/employee/vacation.controller");


router.post('/vacations',VacationController.RequestVacation);
router.get("/vacations",VacationController.GetVacations);
router.put("/vacations/:vac_id",VacationController.AbortVacationRequest);

module.exports = router;