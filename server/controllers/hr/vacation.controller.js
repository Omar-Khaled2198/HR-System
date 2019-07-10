var Vacation = require("../../models/vacation.model");
var Profile = require("../../models/profile.model");

const ResponseVacationRequest = function(req,res){

    Vacation.findById(req.params.vac_id,function(error,vacation){
        
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        if(!vacation)
            return res.status(400).send({msg:"Vacation not found"})

        if(vacation.status=="Pending"){

            if(req.body.status==="Accepted"){

                vacation.status="Accepted";
            }
            else{
                vacation.status="Rejected";
                vacation.rejection_reasons=req.body.rejection_reasons;
            }
            
            vacation.save(function(error){
                
                if(error)
                    return res.status(500).send({msg:"Something went wrong in server."});

                return res.status(200).send({msg:"Response stored successfully."});
            })

        } else {
            return res.status(500).send({msg:"Already action was taken or request was aborted"});
        }
    })

}

const GetAllVacations = function(req,res){

    Vacation.find().populate("requester",["first_name","last_name","job_title","_id"]).exec(function(error,vacations){
        
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        return res.status(200).send(vacations);

    })
}

module.exports = {ResponseVacationRequest,GetAllVacations}