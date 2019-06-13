var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var AccountSeeder = require("./database/account.seeds");
var app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/hr-system',{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    AccountSeeder();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var accountRoute = require("./routes/account.route");
app.use("/",accountRoute);



const PORT = process.env.port || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running on http://127.0.0.1:${PORT}`);
});