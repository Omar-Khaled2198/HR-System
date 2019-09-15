var express = require('express');
var router = express.Router();

var TaskController = require("../../controllers/hr/task.controller");


router.get("/tasks",TaskController.GetAllTasks);
router.post("/tasks",TaskController.AssignTask);

module.exports = router;