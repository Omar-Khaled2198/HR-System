var User = require("../models/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require("../config");


const register = function (req, res, next) {

    var passwordHashed = bcrypt.hashSync(req.body.password, config.saltRounds);
    
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordHashed,
        role: req.body.role
    });

    user.save(function (error) {

        if (error) 
            return res.status(500).send({msg:error.message});

        res.status(200).send({msg:'user registered successfully.'});
    })
}


const login = function (req, res, next) {

    User.findOne({email: req.body.email}, function (error, user) {

        if (error) 
            return res.status(500).send({msg:error.message});

        if (!user) 
            return res.status(404).send({msg:'No user found.'});

        var password = bcrypt.compareSync(req.body.password, user.password);
        if (!password) 
            return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({id: user._id,role:user.role}, config.secret)
        res.status(200).send({auth: true,email: user.email,token});
    
    });
}

module.exports = {register,login}