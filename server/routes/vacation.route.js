var express = require('express');
var router = express.Router();
var Auth = require("../middleware/auth.middleware");

var VacationController = require("../controllers/vacation.controller");


router.post('/:id/vacation/create',Auth("employee"),VacationController.RequestVacation);
router.get("/:id/vacations",Auth("employee"),VacationController.GetVacations);
router.get("/:id/vacation/:vac_id",Auth("employee"),VacationController.AbortRequest);

module.exports = router;