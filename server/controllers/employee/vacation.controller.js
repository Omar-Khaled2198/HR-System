var Vacation = require("../../models/vacation.model");
var Profile = require("../../models/profile.model");
const VacationRepository = require("../../repositories/vacation.repository");

const RequestVacation = async function (req,res){

    req.body.requester = req.decoded.profile._id;
    req.body.status = "Pending";
    req.body.timestamp = Date.now();

    try{
        await VacationRepository.Create(req.body);
        return res.status(200).send({msg:"Vacation requested successfully"});
    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const GetVacations = async function(req,res){

    try {
        const vacations = await VacationRepository.Get({requester:req.decoded.profile._id});
        return res.status(200).send(vacations);
    } catch (error) {
        return res.status(400).send({msg: error});
    }
}

const AbortVacationRequest = async function(req,res){

    try {
        const query = {_id:req.params.vac_id,status:"Pending"};
        const update = {$set:{status:"Aborted"}};
        const vacation = await VacationRepository.Update(query,update);
        return res.status(200).send({vacation,msg:"Vacation request aborted successfully."});

    } catch (error) {
        return res.status(400).send({msg:"Already action was taken or request was aborted"});
    }

}

module.exports = {RequestVacation,GetVacations,AbortVacationRequest};