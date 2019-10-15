const SettingsRepository = require("../repositories/settings.repository");

const SettingsRepositoryInstance = new SettingsRepository();


const GetSettings = async function(req,res){

    try{
        const settings = await SettingsRepositoryInstance.Get({});
        const settingsJSON = settings.toJSON();
        res.status(200).send({...settingsJSON});

    } catch(error){
        return res.status(400).send({msg: error});
    }
}

const UpdateSettings = async function(req, res) {
    
    try {
        const update = { $set: req.body };
        const settings = await SettingsRepositoryInstance.Update({}, update);
        const settingsJSON = settings.toJSON();
        res.status(200).send({...settingsJSON});
	} catch (error) {
		return res.status(400).send({ msg: error });
	}
};


module.exports = {
    GetSettings,
    UpdateSettings
}