const Firebase = require("../utils/firebase.util");
const moment = require("moment");

const PushNotificationByTopic = async function(req, res) {

	
	for(var i=0;i<req.body.topics.length;i++){

		const notification = {
			notification: {
				title: req.body.title,
				body: req.body.body,
				sound: "default"
			},
			
		};
		
		await Firebase.messaging().sendToTopic(req.body.topics[i],notification);
		Firebase.database().ref(`notifications/${req.body.topics[i]}`).push({
			title: req.body.title,
			body: req.body.body,
			at : moment().unix()
		});
		
	}
	

	return res.status(200).send({ msg: "done" });
};


const SubscribeToTopic = async function(req, res) {

	await Firebase.messaging().subscribeToTopic(req.body.device_token,req.params.topic);
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
	Firebase.database().ref(`notifications/public`).push({
		title: req.body.title,
		body: req.body.body,
		at : moment().unix()
	});
	return res.status(200).send({ msg: "done" });
};



module.exports = {
	PushNotificationByTopic,
	PushNotificationToAll,
	SubscribeToTopic
};
