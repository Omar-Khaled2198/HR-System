var express = require('express');
var router = express.Router();

var TaskController = require("../controllers/employee/task.controller");


router.get("/:id/tasks",TaskController.GetTasks);
router.post("/:id/tasks/:task_id",TaskController.ChangeTaskStatus);

module.exports = router;