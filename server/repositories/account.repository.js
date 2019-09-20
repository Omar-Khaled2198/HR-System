const Account = require("../models/account.model");

const Create = async function(body) {

	try {
		const account = new Account(body);
		return await account.save();
	} catch (error) {
		throw error.message;
	}
};

const Get = async function(query) {

    try {
        const account = await Account.findOne(query);
        if(!account){
            throw new Error("No Account Found.")
        }
        return account;
    } catch (error){
        throw error.message;
    }

};

const All = async function(query) {
   
    try {
        return await Task.find();
    } catch(error){
        throw error.message;
    }
};

const Update = async function(query, update) {
    
    try {
		return await Account.findOneAndUpdate(query,update,{new: true});
	} catch (error) {
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

module.exports = { 
    Create, 
    Get, 
    All,
    Update, 
    Delete 
};
