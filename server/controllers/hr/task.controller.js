var Task = require("../../models/task.model");
var Profile = require("../../models/profile.model");

const AssignTask = function(req,res){

    var task = new Task({
        assigned_to: req.body.assigned_to,
        title: req.body.title,
        description: req.body.description,
        timestamp:Date.now(),
        deadline: req.body.deadline,
        status: "To Do"
    })

    task.save(function(error){
        
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        Profile.findById(req.body.assigned_to,function(error,profile){
           
            if(error)
                return res.status(404).send({msg:"Profile not existed."});
            
            profile.tasks.push(task._id);
            profile.save(function(error){
                return res.status(200).send({msg:"Task assigned successfully"});
            })
        })
    })


}

const GetAllTasks = function(req,res){

    Task.find().populate("assigned_to",["first_name","last_name","job_title","_id"]).exec(function(error,tasks){
        
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        return res.status(200).send(tasks);

    })
}

module.exports = {AssignTask,GetAllTasks}