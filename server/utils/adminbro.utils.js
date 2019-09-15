const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const Account = require("../models/account.model");
const Profile = require("../models/profile.model");
const Task = require("../models/task.model");
const Vacation = require("../models/vacation.model");

AdminBro.registerAdapter(require('admin-bro-mongoose'))

const resources = [
    {
        resource: Account,
        options: {
            properties:{
                password: {isVisible: { list: false, filter: false, show: false, edit: false }}
            }
        }
    },
    Profile,
    Vacation,
    Task
];


const adminBro = new AdminBro({resources,rootPath: "/admin"});
const adminRouter = AdminBroExpress.buildRouter(adminBro);

module.exports = { adminBro, adminRouter };