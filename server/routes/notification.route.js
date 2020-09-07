const express = require("express");
const NotificationController = require("../controllers/notification.controller");
const Auth = require("../middleware/auth.middleware");
var router = express.Router();

router.post(
	"/notifications",
	Auth(["hr"]),
	NotificationController.PushNotificationByTopic
);
router.post(
	"/notifications/all",
	Auth(["hr"]),
	NotificationController.PushNotificationToAll
);

router.post(
	"/notifications/:topic",
	Auth(["employee","hr"]),
	NotificationController.SubscribeToTopic
);


module.exports = router;