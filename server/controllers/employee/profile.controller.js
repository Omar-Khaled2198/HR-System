var ProfileRepository = require("../../repositories/profile.repository");

const CreateProfile = async function (req,res){

    try{
        const profile = await ProfileRepository.Create(req.decoded._id,req.body);
        res.status(200).send({profile,msg:"Profile created successfully."});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const GetProfile = async function (req,res){

    try{
        const profile = await ProfileRepository.Get({_id:req.decoded.profile._id});
        res.status(200).send({profile});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const UpdateProfile = async function(req,res){

    try{
        const query = {_id:req.decoded.profile._id};
        const update = {$set:req.body};
        const profile = await ProfileRepository.Update(query, update);
        res.status(200).send({profile,msg:"Profile updated successfully."});
    } catch(error){
        return res.status(400).send({msg: error});
    }
};

const UploadProfileImage = function(req,res){

    if(req.file){
        res.status(200).send({url:'/public/images/uploads/' + req.file.filename})
    } else {
        res.status(500).send({msg: "Something went wrong in server."})
    }

}


module.exports = {CreateProfile, GetProfile, UpdateProfile, UploadProfileImage}