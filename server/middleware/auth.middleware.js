const jwt = require("jsonwebtoken");
const configs = require("../configs");

const Auth = function(roles) {
	return function(req, res, next) {
		let token = req.headers["authorization"];

		if (!token) {
			if(req.query.token){
				token = req.query.token
			} else {
				return res
				.status(403)
				.send({ auth: false, msg: "No token provided." });
			}
		}

		jwt.verify(token, configs.token_secret, function(error, decoded) {
			if (error) {
				return res
					.status(500)
					.send({
						auth: false,
						msg: "Failed to authenticate token."
					});
			}

			if (roles.includes(decoded.role)) {
				req.decoded = decoded;
				next();
			} else {
				return res
					.status(500)
					.send({ auth: false, msg: "You are not Authorized" });
			}
		});
	};
};

module.exports = Auth;
