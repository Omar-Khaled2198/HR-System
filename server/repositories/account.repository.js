const Repository = require("../classes/repository.class");
const AccountModel = require("../models/account.model");
class AccountRepository extends Repository{

    constructor() {
        super(AccountModel)
	}

}

module.exports = AccountRepository;