var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AttendanceSchema = new Schema({

	day: {
		type: String,
		required: true
	},
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Account"
	},
	check_in: {
		type: String
	},
	check_out: {
		type: String
	},
	status: {
		type: String,
		enum: ["Absent", "Vacation", "Attended"],
		required: true
    }
    
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
