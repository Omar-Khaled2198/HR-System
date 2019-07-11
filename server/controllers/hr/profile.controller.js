var Account = require("../../models/account.model");

const GetAllProfiles = function(req,res){

    Account.find({role:"employee"},"profile").populate("profile",["first_name","last_name","job_title","_id"]).exec(function(error,profiles){
        
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        return res.status(200).send(profiles);
    })

}


module.exports = {GetAllProfiles}