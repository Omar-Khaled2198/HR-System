const VacationRepository = require("../repositories/vacation.repository");

const CreateVacation = async function(req,res){

    req.body.created_at = Date.now();
    req.body.status = "Pending";
    try{
        const vacation = await VacationRepository.Create(req.body);
        res.status(200).send({...vacation._doc});

    } catch(error){
        return res.status(400).send({msg: error});
    }

}

const GetVacation = async function (req,res){

    try{
        const vacation = await VacationRepository.Get({_id:req.params.vacation_id});
        res.status(200).send({...vacation._doc});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}


const GetAllVacations = async function (req,res){

    try{
        
        var query = {}
        if(req.query.requester){
            query.requester = req.query.requester;
        }

        if(req.query.status){
            query.status = req.query.status
        }

        const vacations = await VacationRepository.All(query);
        res.status(200).send(vacations);

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const UpdateVacation = async function (req,res){

    try{
        const query = {_id:req.params.vacation_id};
        const update = {$set:req.body};
        const vacation = await VacationRepository.Update(query, update);
        res.status(200).send({...vacation._doc});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}


const DeleteVacation = async function (req,res){

    try{
        await VacationRepository.Delete(req.params.vacation_id);
        res.status(200).send({msg:"Vacation deleted successfully."});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

module.exports = {
    CreateVacation,
    GetVacation,
    UpdateVacation,
    GetAllVacations,
    DeleteVacation
}
