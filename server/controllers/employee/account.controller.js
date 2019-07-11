var Account = require("../../models/account.model");
var SendEmail = require("../../utils/mailhandler.util");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require("../../config");



const Register = function (req, res) {

    var passwordHashed = bcrypt.hashSync(req.body.password, config.saltRounds);
    
    var account = new Account({
        email: req.body.email,
        password: passwordHashed,
        role: "employee"
    });

    account.save(function (error) {

        if (error) 
            return res.status(500).send({msg:error.message});

        var token = jwt.sign({id: account._id,role:account.role}, config.secret)
        
        return res.status(200).send({name:account.name,email: account.email,token});

    })
}


const Login = function (req, res) {

    Account.findOne({email: req.body.email}, function (error, account) {

        if (error) 
            return res.status(500).send({msg:"Something went wrong in server."});

        if (!account) 
            return res.status(404).send({msg:'No account found.'});

        var password = bcrypt.compareSync(req.body.password, account.password);
        
        if (!password) 
            return res.status(401).send({ auth: false, token: null,msg:"the password is wrong." });

        var token = jwt.sign({id: account._id,role:account.role}, config.secret)
        res.status(200).send({auth: true,email: account.email,token});
    
    });
}

const ForgetPasword = function(req,res){
    
    Account.findOne({email: req.body.email},function(error,account){

        if (error) 
            return res.status(500).send({msg:"Something went wrong in server."});
        
        if (!account) 
            return res.status(404).send({msg:'No account found with this email.'});

        var token = jwt.sign({id: account._id,role:account.role}, config.secret,{expiresIn: '1m'})

        SendEmail(req.body.email,"Forget Password",token,function(error,info){
        
            if(error)
                res.status(500).send({msg:"Something went wrong in server"})
    
            res.status(200).send({msg:"Please check your email to reset password."});

        });
    })
    
}

const ResetPassword = function(req,res){
    
    var token = req.headers['x-access-token'];
    
    if (!token)
      return res.status(403).send({ auth: false, msg: 'No token provided.' });

    jwt.verify(token, config.secret, function(err, decoded) {
          
        if (err)
            return res.status(500).send({ auth: false, msg: 'Failed to authenticate token.' });

        var newPasswordHashed = bcrypt.hashSync(req.body.password, config.saltRounds);
        
        Account.findById(decoded.id,function(error,account){

            if (error) 
                return res.status(500).send({msg:"Something went wrong in server."});
            
            if (!account) 
                return res.status(404).send({msg:'No account found with this email.'});

            account.password = newPasswordHashed
            
            account.save(function (error) {

                if (error) 
                    return res.status(500).send({msg:"Something went wrong in server."});

                return res.status(200).send({msg:"password reseted successfully."});
        
            })
    
      });
    })

}


module.exports = {Register,Login,ForgetPasword,ResetPassword}