const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const configs = require("./configs");
const AuthRoutes = require("./routes/auth.routes");
const AccountRoutes = require("./routes/account.routes");
const VacationRoutes = require("./routes/vacation.routes");
const TaskRoutes = require("./routes/task.routes");
const SettingsRoutes = require("./routes/settings.route");
const AttendanceRoutes = require("./routes/attendance.routes");
const NotificationRoutes = require("./routes/notification.route");
const path = require("path");
const cors = require("cors");
const Auth = require("./middleware/auth.middleware");
const Events = require("./middleware/events.middleware");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Database Connect
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose
	.connect(configs.mongodb.atlas_uri, { useNewUrlParser: true })
	.then(() => {
		console.log("MongoDB Cluster connected");
		app.emit("ready");
	})
	.catch(err => console.log("MongoDB connection error", err));

//API Routes
app.use(cors());
app.use(
	"/api/public",
	Auth("*"),
	express.static(path.resolve(__dirname, "public"))
);

// app.use(Events);
app.use("/api", [
	AuthRoutes,
	AccountRoutes,
	VacationRoutes,
	TaskRoutes,
	SettingsRoutes,
	AttendanceRoutes,
	NotificationRoutes
]);

const PORT = process.env.PORT || 5000;
app.on("ready", function() {
	app.listen(PORT, () =>
		console.log(`Server is up and running on http://127.0.0.1:${PORT}`)
	);
});
