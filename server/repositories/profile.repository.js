const Profile = require("../models/profile.model");
const AccountRepository = require("./account.repository");

const Create = async function(account_id, body) {

	try {
		const account = await AccountRepository.Get({ _id: account_id });
		if(account.profile){
			throw new Error("Account already has profile");
		}
		var profile = new Profile(body);
		await profile.save();
		account.profile = profile._id;
		await account.save();
		return profile;
	} catch (error) {
		throw error.message;
	}
};

const Get = async function(property) {

	try {
		return await Profile.findOne(property);
	} catch (error) {
		throw error.message;
	}
};

const All = async function() {

	try {
		return await Profile.find({});
	} catch (error) {
		throw error.message;
	}
};

const Update = async function(query, update) {

	try {
		return await Profile.findOneAndUpdate(query,update,{new: true});
	} catch (error) {
		throw error.message;
	}
};

const Delete = async function(id) {
    
	try {
		return await Profile.findByIdAndDelete(id);
	} catch (error) {
		throw error.message;
	}
};

module.exports = { Create, Get, All, Update, Delete };
