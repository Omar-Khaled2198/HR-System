const Firebase = require("./firebase.util");


const Read = async function(url){
    return await Firebase.database().ref(url).once('value');
}

const Write = function(url, object){
    Firebase.database().ref(url).push(object);
}

const SubscribeToTopic = function(device_token,topic){
	Firebase.messaging().subscribeToTopic(device_token,"/topics/"+topic);
}

const PushNotificationByTopic = function(topic,notification){

    Firebase.messaging().sendToTopic("/topics/"+topic,notification);
}


module.exports = {
    Read,
    Write,
    PushNotificationByTopic,
    SubscribeToTopic
}