class Repository {

    
	constructor(Model) {
		this.Model = Model;
	}

	async Create(body) {
		try {
			const object = new this.Model(body);
			return await object.save();
		} catch (error) {
			throw error.message;
		}
	}

	async Get(query,populate=null,selected="") {
		try {
			const object = await this.Model.findOne(query).populate(populate).select(selected);
			return object;
		} catch (error) {
			throw error.message;
		}
	}

	async All(query,populate=null,selected="") {
		try {
			return await this.Model.find(query).populate(populate).select(selected);
		} catch (error) {
			throw error.message;
		}
	}

	async Update(query, update) {
		try {
			return await this.Model.findOneAndUpdate(query, update, {
				new: true
			});
		} catch (error) {
			throw error.message;
		}
	}

	async Delete(id) {
		try {
			return await this.Model.findByIdAndDelete(id);
		} catch (error) {
			throw error.message;
		}
	}
}

module.exports = Repository;
