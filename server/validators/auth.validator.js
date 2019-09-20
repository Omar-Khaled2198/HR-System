const { body, header } = require("express-validator");
const AccountRepository = require("../repositories/account.repository");


const SignUp = [
	body("email")
		.exists()
		.isEmail()
		.custom(async value => {
			const account = await AccountRepository.Get({ "email": value });
			if (account) {
				return Promise.reject("E-mail already in use.");
			}
		}),
	body("password")
		.exists()
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 chars long")
		.matches(/\d/)
		.withMessage("Password must contain a number"),
];

const SignIn = [
	body("email", "Invalid email")
		.exists()
		.isEmail(),
	body("password")
		.exists()
		.isLength({ min: 8 })
];

const ForgetPassword = [
	body("email")
		.exists()
		.isEmail()
		.custom(async value => {
			const user = await UserRepository.Get({ "email": value });
			if (!user) {
				return Promise.reject("No account found with this email.");
			}
		})
]

const ResetPassword = [
	header("x-access-token").exists().not().isEmpty(),
	body("password")
		.exists()
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 chars long")
]

module.exports = { SignIn, SignUp, ForgetPassword, ResetPassword };