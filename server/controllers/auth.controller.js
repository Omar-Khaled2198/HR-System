const AccountRepository = require("../repositories/account.repository");
var SendEmail = require("../utils/mailhandler.util");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const configs = require("../configs.json");
const Firebase = require("../utils/firebase.util");


const AccountRepositoryInstance = new AccountRepository();

const SignUp = async function(req, res) {
	try {
		req.body.password = bcrypt.hashSync(
			req.body.password,
			configs.saltRounds
		);
		req.body.role = "employee";
		const account = await AccountRepositoryInstance.Create(req.body);
        const token = jwt.sign({ ...account._doc }, configs.token_secret);
        const accountJSON = account.toJSON();
        accountJSON.firebase_token = await GenerateFirebaseToken(account); 
		return res.status(200).send({
			...accountJSON,
			token
		});
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const SignIn = async function(req, res) {
	try {
		const account = await AccountRepositoryInstance.Get({ email: req.body.email });
		if (!account) {
			return res
				.status(404)
				.send({
					auth: false,
					token: null,
					msg: "No account found with this email."
				});
		}

		const check = bcrypt.compareSync(req.body.password, account.password);
		if (!check) {
			return res
				.status(401)
				.send({
					auth: false,
					token: null,
					msg: "The password is wrong."
				});
		}

        const token = jwt.sign({ ...account._doc }, configs.token_secret);
        const accountJSON = account.toJSON();
        accountJSON.firebase_token = await GenerateFirebaseToken(account); 
		return res.status(200).send({
			...accountJSON,
			token
		});
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const ForgetPasword = async function(req, res) {
	try {
		const account = await AccountRepositoryInstance.Get({ email: req.body.email });
		const token = jwt.sign({ ...account._doc }, configs.token_secret);
		const locals = {
			name: account.first_name,
			subject: "Reset Password",
			token
		};

		SendEmail(req.body.email, "Forget Password", token, function(
			error,
			info
		) {
			if (error)
				res.status(500).send({ msg: "Something went wrong in server" });

			res.status(200).send({
				msg: "Please check your email to reset password."
			});
		});
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};

const ResetPassword = async function(req, res) {
	try {
		const token = req.headers["authorization"];
		const decoded = await jwt.verify(token, configs.token_secret);

		const newPasswordHashed = bcrypt.hashSync(
			req.body.password,
			configs.saltRounds
		);

		const query = {_id:req.params.account_id};
		const update = {$set:{"password":newPasswordHashed}};
	
		try {
			await AccountRepositoryInstance.Update(query, update);
			return res
				.status(200)
				.send({ msg: "Password is reset successfully." });
		} catch (error) {
			return res.status(400).send({ msg: error });
		}
	} catch (error) {
		return res.status(400).send({ auth: false, msg: "Invalid Token." });
	}
};

const GenerateFirebaseToken = async function(account){
    let userId = String(account._id);
    let additionalClaims = {
        hr: account.role === "hr" ? true : false
    };
    return await Firebase.auth().createCustomToken(userId,additionalClaims);
}

module.exports = {
	SignUp,
	SignIn,
	ForgetPasword,
	ResetPassword
};
