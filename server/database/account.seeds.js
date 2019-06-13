var Account = require("../models/account.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require("../config");

const AccountSeeder = function(){

    var passwordHashed = bcrypt.hashSync("123456789", config.saltRounds);
    var account = new Account({
        email: "omar21621@gmail.com",
        password: passwordHashed,
        role: "employee"
    });

    account.save(function (error) {

        if (error) 
            console.log("Failed to seed accounts");
        else
            console.log("accounts seeded successfully");
    })
}

module.exports = AccountSeeder