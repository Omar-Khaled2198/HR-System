const FirebaseHandler = require("../utils/firebase_handler.util");
const AccountRepository = require("../repositories/account.repository");

const AccountRepositoryInstance = new AccountRepository();

const PushNotificationByToken = async function(req, res) {

	for(var i=0;i<req.body.accounts.length;i++){
		const query = { _id: req.body.accounts[i] };
		const account = await AccountRepositoryInstance.Get(
			query,
		);
		const notification = {
			notification: {
				title: req.body.title,
				body: req.body.body,
				sound: "default"
			},
			
		};

		FirebaseHandler.PushNotificationByToken(account.device_token,notification);
		
	}
	

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
	FirebaseHandler.PushNotificationByTopic("public",notification);

	return res.status(200).send({ msg: "done" });
};



module.exports = {
	PushNotificationByToken,
	PushNotificationToAll
};
