var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    
    assigned_to:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account'
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
    create_at:{
        type: String,
    },
    start_at:{
        type: String
    },
    deadline:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum: ["Active",'Suspended',"Done"],
    },
    done: {
        type: String,
    }

});

module.exports = mongoose.model('Task', TaskSchema);