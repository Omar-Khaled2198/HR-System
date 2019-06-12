var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var UserSeeder = require("./database/user.seeds");
var app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/hr-system',{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     UserSeeder();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var userRoute = require("./routes/user.route");
app.use("/user",userRoute);



const PORT = process.env.port || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running on http://127.0.0.1:${PORT}`);
});