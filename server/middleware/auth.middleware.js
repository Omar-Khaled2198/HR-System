const jwt = require('jsonwebtoken');
const configs = require('../configs');

const Auth = function (types) {

    return function (req, res, next) {

        const token = req.headers['x-access-token'];

        if (!token){
            return res.status(403).send({auth: false, msg: 'No token provided.'});
        }

        jwt.verify(token, configs.token_secret, function (error, decoded) {

            if (error){
                return res.status(500).send({auth: false, msg: 'Failed to authenticate token.'});
            }

            if (types.includes(decoded.type) || types.includes("*")) {
                req.decoded = decoded;
                next();
            } else {
                return res.status(500).send({auth: false, msg: 'You are not Authorized'});
            }
        });
    }
};

module.exports = Auth;