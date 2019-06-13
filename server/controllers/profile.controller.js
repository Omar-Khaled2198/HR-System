var Profile = require("../models/profile.model")
var Account = require("../models/account.model")

const CreateProfile = function (req,res){

    Account.findById(req.accountId,function(error,account){
            
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        if (!account) 
            return res.status(404).send({msg:'No account found.'});

        if(account.profile!=null)
            return res.status(500).send({msg:'Already have profile.'});
        
        var profile = new Profile({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            job_title:req.body.job_title
        })

        profile.save(function(error){

            account.profile=profile._id;
            account.save(function(error){
            
            if(error)
                return res.status(500).send({msg:"Something went wrong in server."});

            return res.status(200).send({msg:"Profile created successfully."})
        })

        })

        
    })
}

const GetProfile = function (req,res){

    Account.findById(req.accountId).populate('profile').exec(function(error,account){
            
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        if (!account) 
            return res.status(404).send({msg:'No account found.'});

        if(account.profile==null)
            return res.status(404).send({msg:'No found profile'});

        res.status(200).send(account.profile)
    })
}

module.exports = {CreateProfile,GetProfile}