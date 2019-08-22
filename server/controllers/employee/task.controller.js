var Vacation = require("../../models/task.model");
var Profile = require("../../models/profile.model");



const GetTasks = function(req,res){

    Profile.findById(req.params.id).populate("tasks").exec(function(error,profile){

        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        return res.status(200).send(profile.tasks);
    })
}

const ChangeTaskStatus = function(req,res){

    Task.findById(req.params.task_id,function(error,task){
        
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        if(!task)
            return res.status(400).send({msg:"Task not found"})

            task.status=req.body.status;
            task.save(function(){
                return res.status(200).send({msg:"Task status changed successfully."});
            })
    })
}


module.exports = {GetTasks,ChangeTaskStatus}