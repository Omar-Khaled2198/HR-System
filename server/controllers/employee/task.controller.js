const TaskRepository = require("../../repositories/task.repository");

const GetTasks = async function(req,res){

    try {
        const tasks = await TaskRepository.Get({assigned_to:req.decoded.profile._id});
        return res.status(200).send(tasks);
    } catch (error) {
        return res.status(400).send({msg: error});
    }
}

const ChangeTaskStatus = async function(req,res){

    try {
        const query = {_id:req.params.task_id,status:"To Do"};
        const update = {$set:{status:"Done"}};
        const task = await TaskRepository.Update(query,update);
        return res.status(200).send({task,msg:"Task status changed successfully."});

    } catch (error) {
        return res.status(400).send({msg:error});
    }
}


module.exports = {GetTasks,ChangeTaskStatus}