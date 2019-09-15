var Profile = require("../../models/profile.model")
var Account = require("../../models/account.model")


const CreateProfile = function (req,res){

    Account.findById(req.accountId,function(error,account){
            
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        if (!account) 
            return res.status(404).send({msg:'No account found.'});

        if(account.profile!=null)
            return res.status(500).send({msg:'Already have profile.'});

        var url = "";
        if(req.body.profile_picture!=""){
            url = req.body.profile_picture;
        }
        
        var profile = new Profile({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            job_title:req.body.job_title,
            profile_picture:url
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

    Account.findById(req.accountId).populate('profile',["first_name","last_name","job_title","_id"]).exec(function(error,account){
            
        if(error)
            return res.status(500).send({msg:"Something went wrong in server."});

        if (!account) 
            return res.status(404).send({msg:'No account found.'});

        if(account.profile==null)
            return res.status(404).send({msg:'No profile found.'});

        res.status(200).send(account.profile)
    })
}

const UploadProfileImage = function(req,res){

    if(req.file){
        res.status(200).send({url:'/public/images/uploads/' + req.file.filename})
    } else {
        res.status(500).send({msg: "Something went wrong in server."})
    }
    
    
}


module.exports = {CreateProfile,GetProfile,UploadProfileImage}