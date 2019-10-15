const Repository = require("../classes/repository.class");
const TaskModel = require("../models/task.model");
class TaskRepository extends Repository{


    constructor(){
        super(TaskModel)
    }

}

module.exports = TaskRepository;