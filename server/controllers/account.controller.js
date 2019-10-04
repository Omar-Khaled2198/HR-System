var AccountRepository = require("../repositories/account.repository");


const CreateAccount = async function (req,res) {

    if(req.body.profile.profile_picture==""){
        req.body.profile.profile_picture = "/public/profile_pictures/default_profile_picture.png";
    }
    try{
        const account = await AccountRepository.Create(req.body);
        res.status(200).send({...account._doc});

    } catch(error){
        return res.status(400).send({msg: error});
    }
    
}

const GetAccount = async function (req,res){

    try{
        const account = await AccountRepository.Get({_id:req.params.account_id});
        res.status(200).send({...account._doc});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const GetAllAccounts = async function (req,res){

    try{
        const accounts = await AccountRepository.All({});
        res.status(200).send(accounts);

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const UpdateAccount = async function (req,res){

    if(req.body.profile.profile_picture===""){
        req.body.profile.profile_picture = "/public/profile_pictures/default_profile_picture.png";
    }

    try{
        const query = {_id:req.params.account_id};
        const update = {$set:req.body};
        const account = await AccountRepository.Update(query, update);
        res.status(200).send({...account._doc});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}


const DeleteAccount = async function (req,res){

    try{
        await AccountRepository.Delete(req.params.account_id);
        res.status(200).send({msg:"Account deleted successfully."});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const UploadProfilePicture = function(req,res){

    if(req.file){
        res.status(200).send({url:'/public/profile_pictures/uploads/' + req.file.filename})
    } else {
        res.status(500).send({msg: "Something went wrong in server."})
    }

}


module.exports = {
    CreateAccount,
    GetAccount,
    UpdateAccount,
    GetAllAccounts,
    DeleteAccount,
    UploadProfilePicture  
}
