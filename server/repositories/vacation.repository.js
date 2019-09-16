const Vacation = require("../models/vacation.model");
const ProfileRepository = require("./profile.repository");

const Create = async function(body) {

	try {
		const vacation = new Vacation(body);
        await vacation.save();
        const query = {_id:vacation.requester};
        const update = {$push:{"vacations":vacation._id}}
        await ProfileRepository.Update(query,update);
        return vacation;
	} catch (error) {
		throw error.message;
	}
};

const Get = async function(property) {

    try {
        return await Vacation.find(property);
    } catch (error){
        throw error.message;
    }

};

const All = async function() {
   
    try {
        return await Vacation.find({});
    } catch(error){
        throw error.message;
    }
};

const Update = async function(query, update) {
    
    try {
		return await Vacation.findOneAndUpdate(query,update,{new: true});
	} catch (error) {
		throw error.message;
	}
};

const Delete = async function(id) {

    try {
        return await Vacation.findByIdAndDelete(id);
    } catch (error){
        throw error.message;
    }
};

module.exports = { Create, Get, All, Update, Delete };
