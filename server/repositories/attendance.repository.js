const Repository = require("../classes/repository.class");
const AttendanceModel = require("../models/attendance.model");
class AttendanceRepository extends Repository{

    constructor() {
        super(AttendanceModel)
	}
}

module.exports = AttendanceRepository;