var Profile = require("../models/profile.model");
var AccountRepository = require("./account.repository");

const Create = async function(account_id, body) {

	try {
		const account = await AccountRepository.Get({ _id: account_id });
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

const Update = async function(id, body) {

	try {
		var profile = await Profile.findById(id);
		for (var property in body) {
			profile[property] = body[property];
		}
		return await profile.save();
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
