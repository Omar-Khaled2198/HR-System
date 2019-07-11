const nodemailer = require("nodemailer");
const config = require("../config.json");


const SendEmail = function(to,subject,content,callback){

    const transporter = nodemailer.createTransport(
        config.nodemailer
    );

    transporter.sendMail({
        from: config.nodemailer.auth.user,
        to: to,
        subject: subject,
        text: content,
      },callback);
}

module.exports = SendEmail;