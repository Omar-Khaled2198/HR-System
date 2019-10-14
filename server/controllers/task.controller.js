const TaskRepository = require("../repositories/task.repository");
const TaskModel = require("../models/task.model");
const moment = require('moment');

const TaskRepositoryInstance = new TaskRepository(TaskModel);

const CreateTask = async function(req, res) {
	req.body.created_at = moment().unix();
	try {
		const task = await TaskRepositoryInstance.Create(req.body);
		res.status(200).send({ ...task._doc });
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const GetTask = async function(req, res) {
	try {
		const populate = {
			path: "assigned_to",
			select: "_id profile.first_name profile.last_name"
		};
		const task = await TaskRepositoryInstance.Get(
			{ _id: req.params.task_id },
			populate
		);
		res.status(200).send({ ...task._doc });
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const GetAllTasks = async function(req, res) {
	try {
		var query = {};
		var populate = null;
		if (req.query.assigned_to) {
			query = { assigned_to: req.query.assigned_to };
        }
        
		if (!req.query.assigned_to) {
			populate = {
				path: "assigned_to",
				select: "_id profile.first_name profile.last_name"
			};
		}
		const tasks = await TaskRepositoryInstance.All(query, populate);
		res.status(200).send(tasks);
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const UpdateTask = async function(req, res) {
	try {
		const query = { _id: req.params.task_id };
		const update = { $set: req.body };
		const task = await TaskRepositoryInstanceInstance.Update(query, update);
		res.status(200).send({ ...task._doc });
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const DeleteTask = async function(req, res) {
	try {
		await TaskRepositoryInstance.Delete(req.params.task_id);
		res.status(200).send({ msg: "Task deleted successfully." });
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

module.exports = {
	CreateTask,
	GetTask,
	UpdateTask,
	GetAllTasks,
	DeleteTask
};
