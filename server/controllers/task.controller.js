const TaskRepository = require("../repositories/task.repository");
const moment = require("moment");
const Firebase = require("../utils/firebase.util");
const NotificationMapper = require("../utils/notification_mapper.util");

const TaskRepositoryInstance = new TaskRepository();

const CreateTask = async function (req, res) {
  req.body.created_at = moment().unix();
  try {
    const task = await TaskRepositoryInstance.Create(req.body);
    if (req.decoded.role == "hr") {
      await Firebase.messaging().sendToTopic(
        req.body.assigned_to,
        NotificationMapper("NEWTASK")
      );
    }
    res.status(200).send({ ...task._doc });
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
};

const GetTask = async function (req, res) {
  try {
    const populate = {
      path: "assigned_to",
      select: "_id profile",
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

const GetAllTasks = async function (req, res) {
  try {
    var query = {};
    var populate = null;
    if (req.query.assigned_to) {
      query = { assigned_to: req.query.assigned_to };
    }

    if (!req.query.assigned_to) {
      populate = {
        path: "assigned_to",
        select: "_id profile",
      };
    }
    const tasks = await TaskRepositoryInstance.All(query, populate);

    res.status(200).send(tasks);
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
};

const UpdateTask = async function (req, res) {
  try {
    const query = { _id: req.params.task_id };
    const update = { $set: req.body };
    const task = await TaskRepositoryInstance.Update(query, update);
    if (req.decoded.role == "hr") {
      await Firebase.messaging().sendToTopic(
        req.body.assigned_to._id,
        NotificationMapper("UPDATETASK")
      );
    }
    res.status(200).send({ ...task._doc });
  } catch (error) {
    return res.status(400).send({ msg: error });
  }
};

const DeleteTask = async function (req, res) {
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
  DeleteTask,
};
