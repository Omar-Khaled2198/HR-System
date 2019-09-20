var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({

    email: {
        type: String,
        required: true,
        max: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['employee', 'hr'],
        required: true
    },
    profile:{
        first_name: {
            type: String,
            max: 100
        },
        last_name: {
            type: String,
            max: 100
        },
        job_title:{
            type: String,
        },
        profile_picture:{
            type: String
        }
    }

});

module.exports = mongoose.model('Account', AccountSchema);