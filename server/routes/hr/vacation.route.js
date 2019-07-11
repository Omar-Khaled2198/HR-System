var express = require('express');
var router = express.Router();


var VacationController = require("../../controllers/hr/vacation.controller");


router.get("/vacations",VacationController.GetAllVacations);
router.put("/vacations/:vac_id",VacationController.ResponseVacationRequest);


module.exports = router;