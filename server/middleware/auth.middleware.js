var jwt = require('jsonwebtoken');
var config = require('../config');

const Auth = function(role){

    return function (req, res, next) {

        var token = req.headers['x-access-token'];
        if (!token)
          return res.status(403).send({ auth: false, msg: 'No token provided.' });
          
        jwt.verify(token, config.secret, function(err, decoded) {
          
          if (err)
              return res.status(500).send({ auth: false, msg: 'Failed to authenticate token.' });
            
          if(decoded.role==role||role=="*"){
              req.accountId=decoded.id;
              next();
          }
          else
              return res.status(500).send({ auth: false, msg: 'Failed to authenticate token.' });
        });
    }
}

module.exports = Auth;