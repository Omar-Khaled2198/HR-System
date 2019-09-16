const Account = require("../models/account.model");

const Create = async function(body) {

	try {
		const account = new Account(body);
		return await account.save();
	} catch (error) {
		throw error.message;
	}
};

const Get = async function(property) {

    try {
        return await Account.findOne(property).populate("profile").exec();
    } catch (error){
        throw error.message;
    }

};

const All = async function() {
   
    try {
        return await Account.find({});
    } catch(error){
        throw error.message;
    }
};

const Update = async function(id, body) {
    
    try{
        var account = await Account.findById(id);
        for(var property in body){
            account[property] = body[property];
        }
        return await account.save();

    } catch(error){
        throw error.message;
    }
};

const Delete = async function(id) {

    try {
        return await Account.findByIdAndDelete(id);
    } catch (error){
        throw error.message;
    }
};

module.exports = { Create, Get, All, Update, Delete };
