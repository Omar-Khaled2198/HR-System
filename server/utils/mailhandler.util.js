// const nodemailer = require("nodemailer");
// const config = require("../config.json");


// const SendEmail= function(to,subject,text){

//     const transporter = nodemailer.createTransport({
//         host: config.host,
//         port: config.port,
//         auth: {
//             user: config.auth.user,
//             password: config.auth.password
//         }
//     });

//     transporter.sendMail({
//         from: config.auth.user,
//         to: to,
//         subject: subject,
//         text: text,
//       },function(error,info){
//          console.log(info); 
//       });
// }

// module.exports = SendEmail;