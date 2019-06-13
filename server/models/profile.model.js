var mongoose = require('mongoose');
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
        type: String,
        required:true
    },
    profile_picture:{
        type: String
    },
    vacations: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Vacation'
    }]
});

module.exports = mongoose.model('Profile', ProfileSchema);