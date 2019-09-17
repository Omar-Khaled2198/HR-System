const Account = require("../../models/account.model");


module.exports = {
    resource: Account,
    options: {
        properties: {
            _id: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: false,
                    edit: false
                }
            },
            password: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: false,
                    edit: false
                }
            }
        },
        actions: {
            edit: { isVisible: false }
        }
    }
}