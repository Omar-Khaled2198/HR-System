var Vacation = require("../../models/task.model");
var Profile = require("../../models/profile.model");

const AssignTask = function(req,res){

    var task = new task({
        assigned_to: req.body.id,
        title: req.body.title,
        description: req.body.description,
        timestamp:Date.now(),
        deadline: req.body.deadline,
        status: "To Do"
    })

    task.save(function(error){
        
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        Profile.findById(req.body.id,function(error,profile){

            if(error)
                return res.status(404).send({msg:"Profile not existed."});
            
            profile.tasks.push(task._id);
            profile.save(function(){
                return res.status(200).send({msg:"Task assigned successfully"});
            })
        })
    })


}

module.exports = {AssignTask}