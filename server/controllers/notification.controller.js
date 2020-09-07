const Firebase = require("../utils/firebase.util");

const PushNotificationByTopic = async function(req, res) {

	
	for(var i=0;i<req.body.topics.length;i++){

		const notification = {
			notification: {
				title: req.body.title,
				body: req.body.body,
				sound: "default"
			},
			
		};
		
		Firebase.messaging().sendToTopic(req.body.topics[i],notification);
		
	}
	

	return res.status(200).send({ msg: "done" });
};


const SubscribeToTopic = async function(req, res) {

	Firebase.messaging().subscribeToTopic(req.body.device_token,req.params.topic);
	return res.status(200).send({ msg: "done" });
};


const PushNotificationToAll = async function(req, res) {
    
	const notification = {
		notification: {
			title: req.body.title,
			body: req.body.body,
			sound: "default"
		}
	};
	Firebase.messaging().sendToTopic("public",notification);
	return res.status(200).send({ msg: "done" });
};



module.exports = {
	PushNotificationByTopic,
	PushNotificationToAll,
	SubscribeToTopic
};
