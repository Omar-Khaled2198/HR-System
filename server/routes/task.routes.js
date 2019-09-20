const express = require("express");
const Validate = require("../middleware/validate.middleware");
const Auth = require("../middleware/auth.middleware");
const TaskController = require("../controllers/task.controller");
var router = express.Router();

router.post(
	"/tasks",
	Auth(["hr", "employee"]),
	TaskController.CreateTask
);

router.get(
	"/tasks",
	Auth(["hr", "employee"]),
	TaskController.GetAllTasks
);

router.get(
	"/tasks/:task_id",
	Auth(["hr", "employee"]),
	TaskController.GetTask
);

router.put(
	"/tasks/:task_id",
	Auth(["hr", "employee"]),
	TaskController.UpdateTask
);

router.delete(
	"/tasks/:task_id",
	Auth(["hr"]),
	TaskController.DeleteTask
);

module.exports = router;