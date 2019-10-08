const Task = require("../models/task.model");

const Create = async function(body) {

	try {
		const task = new Task(body);
        return task.save();
	} catch (error) {
		throw error.message;
	}
};

const Get = async function(query) {

    try {
        const task = await Task.findOne(query).populate(
			"assigned_to",
			"_id profile.first_name profile.last_name"
		);
        if(!task){
            throw new Error("No Task Found.")
        }
        return task;
    } catch (error){
        throw error.message;
    }

};

const All = async function(query) {
   
    try {
        return await Task.find(query).populate(
			"assigned_to",
			"_id profile.first_name profile.last_name"
		);
    } catch(error){
        throw error.message;
    }
};

const Update = async function(query, update) {
    
    try {
		return await Task.findOneAndUpdate(query,update,{new: true});
	} catch (error) {
		throw error.message;
	}
};

const Delete = async function(id) {

    try {
        return await Task.findByIdAndDelete(id);
    } catch (error){
        throw error.message;
    }
};

module.exports = { Create, Get, All, Update, Delete };
