const express = require("express");
const Validate = require("../middleware/validate.middleware");
const Auth = require("../middleware/auth.middleware");
const AccountController = require("../controllers/account.controller");
const Upload = require("../middleware/file.midldeware");
var router = express.Router();

router.post("/accounts", Auth(["hr"]), AccountController.CreateAccount);

router.get(
	"/accounts/:account_id",
	Auth(["hr", "employee"]),
	AccountController.GetAccount
);

router.get("/accounts", Auth(["hr"]), AccountController.GetAllAccounts);

router.put(
	"/accounts/:account_id",
	Auth(["hr", "employee"]),
	AccountController.UpdateAccount
);

router.delete(
	"/accounts/:account_id",
	Auth(["hr", "employee"]),
	AccountController.DeleteAccount
);
//router.post('/accounts',Upload.single("profile_picture"),AccountController.UploadProfilePicture);

module.exports = router;
