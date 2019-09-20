const Vacation = require("../models/vacation.model");

const Create = async function(body) {

	try {
		const vacation = new Vacation(body);
        return await vacation.save();
	} catch (error) {
		throw error.message;
	}
};

const Get = async function(query) {

    try {
        const vacation = await Vacation.findOne(query);
        if(!vacation){
            throw new Error("No Vacation Found.")
        }
        return vacation;
    } catch (error){
        throw error.message;
    }


};

const All = async function(query) {
   
    try {
        return await Vacation.find(query);
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
