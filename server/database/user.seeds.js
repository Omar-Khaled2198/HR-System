var User = require("../models/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const config = require("../config");

const UserSeeder = function(){

    var passwordHashed = bcrypt.hashSync("123456789", config.saltRounds);
    var user = new User({
        name: "Omar Khaled",
        email: "omar21621@gmail.com",
        password: passwordHashed,
        role: "hr"
    });

    user.save(function (error) {

        if (error) 
            console.log("Failed to seed user");
        else
            console.log("User seeded successfully");
    })
}

module.exports = UserSeeder