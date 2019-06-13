var Account = require("../models/account.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require("../config");



const Register = function (req, res) {

    var passwordHashed = bcrypt.hashSync(req.body.password, config.saltRounds);
    
    var account = new Account({
        email: req.body.email,
        password: passwordHashed,
        role: req.body.role
    });

    account.save(function (error) {

        if (error) 
            return res.status(500).send({msg:error.message});

        var token = jwt.sign({id: account._id,role:account.role}, config.secret)
        res.status(200).send({name:account.name,email: account.email,token});

    })
}


const Login = function (req, res) {

    Account.findOne({email: req.body.email}, function (error, account) {

        if (error) 
            return res.status(500).send({msg:error.message});

        if (!account) 
            return res.status(404).send({msg:'No account found.'});

        var password = bcrypt.compareSync(req.body.password, account.password);
        if (!password) 
            return res.status(401).send({ auth: false, token: null });

        var token = jwt.sign({id: account._id,role:account.role}, config.secret)
        res.status(200).send({auth: true,email: account.email,token});
    
    });
}


module.exports = {Register,Login}