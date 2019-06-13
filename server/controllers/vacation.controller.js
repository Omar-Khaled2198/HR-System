var Vacation = require("../models/vacation.model");
var Profile = require("../models/profile.model");

const RequestVacation = function (req,res){
    
    var vacation = new Vacation({
        requester:req.params.id,
        title:req.body.title,
        description:req.body.description,
        from:req.body.from,
        to:req.body.to,
        status:"Pending",
        timestamp:Date.now()
    })

    vacation.save(function(error){

        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        Profile.findById(req.params.id,function(error,profile){
            
            profile.vacations.push(vacation._id);
            profile.save(function(){
                return res.status(200).send({msg:"Requested vacation successfully"});
            })
        })
        
            
    })

}

const GetVacations = function(req,res){

    console.log(req.params.id);
    Profile.findById(req.params.id).populate("vacations").exec(function(error,profile){

        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        return res.status(200).send(profile.vacations);
    })
}

module.exports = {RequestVacation,GetVacations};