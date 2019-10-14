const AttandanceRepository = require("../repositories/attandance.repository");
const AttendanceModel = require("../models/attendance.model");

const AttendanceRepositoryInstance = new AttandanceRepository(AttendanceModel);

const CheckIn = async function(req,res){


    console.log(req.body);
    res.status(200).send({msg:"done"});

}

module.exports = {
    CheckIn
}