const TaskRepository = require("../repositories/task.repository");


const CreateTask = async function(req,res){

    req.body.created_at = Date.now();
    try{
        const task = await TaskRepository.Create(req.body);
        res.status(200).send({...task._doc});

    } catch(error){
        return res.status(400).send({msg: error});
    }

}

const GetTask = async function (req,res){

    try{
        const task = await TaskRepository.Get({_id:req.params.task_id});
        res.status(200).send({...task._doc});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}


const GetAllTasks = async function (req,res){

    try{
        const tasks = await TaskRepository.All({});
        res.status(200).send(tasks);

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const UpdateTask = async function (req,res){

    try{
        const query = {_id:req.params.task_id};
        const update = {$set:req.body};
        const task = await TaskRepository.Update(query, update);
        res.status(200).send({...task._doc});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}


const DeleteTask = async function (req,res){

    try{
        await TaskRepository.Delete(req.params.task_id);
        res.status(200).send({msg:"Task deleted successfully."});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

module.exports = {
    CreateTask,
    GetTask,
    UpdateTask,
    GetAllTasks,
    DeleteTask
}
