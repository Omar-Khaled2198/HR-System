var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    
    assigned_to:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Profile'
    },
    title: {
        type: String,
        required: true,
        max: 100
    },
    description:{
        type: String,
        required:true
    },
    timestamp:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model('Task', TaskSchema);