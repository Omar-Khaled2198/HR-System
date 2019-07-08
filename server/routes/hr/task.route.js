var express = require('express');
var router = express.Router();

var TaskController = require("../../controllers/hr/task.controller");


router.get("/:id/tasks",TaskController.GetAllTasks);
router.post("/:id/tasks/:task-id",TaskController.AssignTask);

module.exports = router;