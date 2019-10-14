const Repository = require("../classes/repository.class");

class SettingsRepository extends Repository{



    async Update(query, update) {
		try {
			return await this.Model.findOneAndUpdate(query, update, {
                new: true,
                upsert: true
			});
		} catch (error) {
			throw error.message;
		}
	}

}

module.exports = SettingsRepository;