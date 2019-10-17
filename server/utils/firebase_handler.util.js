const Firebase = require("./firebase.util");


const Read = async function(url){
    return await Firebase.database().ref(url).once('value');
}

const Write = function(url, object){
    Firebase.database().ref(url).push(object);
}

const PushNotificationByToken = function(device_token,notification){

    Firebase.messaging().sendToDevice(device_token,notification);
}

const SubscribeToTopic = function(device_token){
	Firebase.messaging().subscribeToTopic(device_token,"public");
}

const PushNotificationByTopic = function(topic,notification){

    Firebase.messaging().sendToTopic(topic,notification);
}


module.exports = {
    Read,
    Write,
    PushNotificationByToken,
    PushNotificationByTopic,
    SubscribeToTopic
}