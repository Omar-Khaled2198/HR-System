const Vacation = require("../../models/vacation.model");

module.exports = {
    resource: Vacation,
    options: {
        actions: {
            edit: {
                label: "Respond"
            },
            delete: {
                isVisible: false
            }
        },
        properties: {
            _id: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: false,
                    edit: false
                }
            },
            requester: {
                isVisible: {
                    list: true,
                    filter: true,
                    show: true,
                    edit: false
                }
            },
            title: {
                isVisible: {
                    list: true,
                    filter: true,
                    show: true,
                    edit: false
                }
            },
            description: {
                isVisible: {
                    list: true,
                    filter: true,
                    show: true,
                    edit: false
                },
                type: "richtext"
            },
            timestamp: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: false,
                    edit: false
                },
                type: "date",
                label: "time"
            },
            from: {
                isVisible: {
                    list: true,
                    filter: true,
                    show: true,
                    edit: false
                }
            },
            to: {
                isVisible: {
                    list: true,
                    filter: true,
                    show: true,
                    edit: false
                }
            },
            rejection_reasons: {
                isVisible: {
                    list: true,
                    filter: true,
                    show: true,
                    edit: true
                }
            }
        }
    }
}