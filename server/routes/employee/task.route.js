var express = require('express');
var router = express.Router();

var TaskController = require("../../controllers/employee/task.controller");


router.get("/tasks",TaskController.GetTasks);
router.put("tasks/:task_id",TaskController.ChangeTaskStatus);

module.exports = router;