const Repository = require("../classes/repository.class");
const SettingsModel = require("../models/settings.model");
class SettingsRepository extends Repository{

	constructor() {
        super(SettingsModel)
	}

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