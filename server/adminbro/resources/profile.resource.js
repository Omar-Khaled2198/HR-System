const Profile = require("../../models/profile.model");

module.exports = {
    resource: Profile,
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
            vacations: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: true,
                    edit: false
                }
            },
            tasks: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: true,
                    edit: false
                }
            }
        },
        actions: {
            edit: { isVisible: false }
        }
    }
}