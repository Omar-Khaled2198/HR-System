const configs = require("../configs.json");
var admin = require("firebase-admin");

var serviceAccount = require("../service_account.json");

const Firebase = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: configs.firebase.databaseURL
});

module.exports = Firebase;
