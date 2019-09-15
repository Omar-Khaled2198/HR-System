var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const db = require("./configs").mongodb;
var AccountSeeder = require("./database/account.seeds");
var accountRoute = require("./routes/account.route");
var employeeProfileRoute = require("./routes/employee/profile.route");
var employeeVacationRoute = require("./routes/employee/vacation.route");
var employeeTaskRoute = require("./routes/employee/task.route");
var hrVacationRoute = require("./routes/hr/vacation.route");
var hrTaskRoute = require("./routes/hr/task.route");
var hrProfileRoute = require("./routes/hr/profile.route");
var path = require("path");
var cors = require('cors');
var app = express();



//Database Connect
mongoose.set('useCreateIndex', true);
mongoose.connect(db.mongoURI, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Cluster connected");
        app.emit("ready")
    })
    .catch(err => console.log("MongoDB connection error", err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const Auth = require("./middleware/auth.middleware");

app.use(cors());
app.use('/api/public', Auth("*"), express.static(path.resolve(__dirname, 'public')));
app.use("/api", accountRoute);
app.use("/api/employee", Auth(["employee"]), [employeeProfileRoute, employeeVacationRoute, employeeTaskRoute]);
app.use("/api/hr", Auth("hr"), [hrVacationRoute, hrTaskRoute, hrProfileRoute]);



const PORT = process.env.PORT || 5000;
app.on("ready", function () {
    app.listen(PORT, () => console.log(`Server is up and running on http://127.0.0.1:${PORT}`));
});