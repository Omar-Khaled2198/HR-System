const AccountRepository = require("../../repositories/account.repository");
var SendEmail = require("../../utils/mailhandler.util");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const configs = require("../../configs.json");



const SignUp = async function (req, res) {

    try {
        req.body.password = bcrypt.hashSync(req.body.password, configs.saltRounds);
        req.body.role = "employee";
        const account = await AccountRepository.Create(req.body);
        const token = jwt.sign({...account._doc}, configs.token_secret);
        return res.status(200).send({
            account,
            token,
            msg: "Account created successfully."
        });

    } catch (error){

        return res.status(400).send({msg: error});
    }
}


const SignIn = async function (req, res) {

    try{

        const account = await AccountRepository.Get({"email":req.body.email});
        if(!account){
            return res.status(404).send({auth: false, token: null, msg: "No account found with this email."});
        }

        const check = bcrypt.compareSync(req.body.password, account.password);
        if (!check) {
            return res.status(401).send({auth: false, token: null, msg: "The password is wrong."});
        }

        const token = jwt.sign({...account._doc}, configs.token_secret);
        return res.status(200).send({
            account,
            token
        });
        
    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const ForgetPasword = async function(req,res){

    try{

        const account = await AccountRepository.Get({"email":req.body.email});
        const token = jwt.sign({...account._doc}, configs.token_secret);
        const locals = {
            name: account.first_name,
            subject: "Reset Password",
            token
        };

       
        SendEmail(req.body.email,"Forget Password",token,function(error,info){
        
            if(error)
                res.status(500).send({msg:"Something went wrong in server"})
    
            res.status(200).send({msg:"Please check your email to reset password."});

        });

    } catch(error){
        return res.status(400).send({msg: error});
    }
    
}

const ResetPassword = async function(req,res){

    try{
        const token = req.headers['x-access-token'];
        const decoded = await jwt.verify(token, configs.token_secret)

        const newPasswordHashed = bcrypt.hashSync(req.body.password, configs.saltRounds);
        var account = await AccountRepository.Get({ "email": decoded.email });
        account.password = newPasswordHashed;
        
        try{
            await AccountRepository.Update(account._id,account);
            return res.status(200).send({msg: "Password is reset successfully."});
        } catch(error){
            return res.status(400).send({msg: error});
        }

    } catch(error){
        return res.status(400).send({auth: false, msg: 'Invalid Token.'});
    }

}


module.exports = {SignUp,SignIn,ForgetPasword,ResetPassword}