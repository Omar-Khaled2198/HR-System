const Firebase = require("../utils/firebase.util");

const Events = function(req,res,next){

    var event = {}
    if(req.body.event){
        event = req.body.event;
        delete req.body.event
    }
    res.on("finish",function(){

        if(res.statusCode == 200 && Object.keys(event).length>0){
            Firebase.database().ref('events/').push(event);
        }
        
    })

    next();
}


module.exports = Events