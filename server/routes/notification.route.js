const express = require("express");
const NotificationController = require("../controllers/notification.controller");
const Auth = require("../middleware/auth.middleware");
var router = express.Router();

router.post(
	"/notifications",
	Auth(["hr"]),
	NotificationController.PushNotificationByToken
);
router.post(
	"/notifications/all",
	Auth(["hr"]),
	NotificationController.PushNotificationToAll
);


module.exports = router;