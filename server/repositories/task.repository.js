const Task = require("../models/task.model");
const ProfileRepository = require("./profile.repository");

const Create = async function(body) {

	try {
		const task = new Task(body);
        await task.save();
        const query = {_id:task.assigned_to};
        const update = {$push:{"tasks":task._id}}
        await ProfileRepository.Update(query,update);
        return task;
	} catch (error) {
		throw error.message;
	}
};

const Get = async function(property) {

    try {
        return await Task.find(property);
    } catch (error){
        throw error.message;
    }

};

const All = async function() {
   
    try {
        return await Task.find({});
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
