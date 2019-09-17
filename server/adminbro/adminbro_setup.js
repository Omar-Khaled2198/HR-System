const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AccountResource = require("./resources/account.resource");
const ProfileResource = require("./resources/profile.resource");
const VacationResource = require("./resources/vacation.resource");
const TaskResource = require("./resources/task.resource");

AdminBro.registerAdapter(require("admin-bro-mongoose"));

const resources = [
	AccountResource,
	ProfileResource,
	VacationResource,
	TaskResource
];

const adminBro = new AdminBro({
	resources,
	rootPath: "/admin",
	branding: { companyName: "HR-System" }
});
const adminRouter = AdminBroExpress.buildRouter(adminBro);

module.exports = { adminBro, adminRouter };
