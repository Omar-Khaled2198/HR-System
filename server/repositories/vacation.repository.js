const Repository = require("../classes/repository.class");
const VacationModel = require("../models/vacation.model");
class VacationRepository extends Repository{


    constructor(){
        super(VacationModel)
    }

}

module.exports = VacationRepository;