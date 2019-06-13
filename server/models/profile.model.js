var mongoose = require('mongoose');
var vacationSchema = require("./vacation.model");
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({

    first_name: {
        type: String,
        required: true,
        max: 100
    },
    last_name: {
        type: String,
        required: true,
        max: 100
    },
    job_title:{
        type: String
    },
    profile_picture:{
        type: String
    },
    vacatons:[vacationSchema]
});

module.exports = mongoose.model('Profile', ProfileSchema);