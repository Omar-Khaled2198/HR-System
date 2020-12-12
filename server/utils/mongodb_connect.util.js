const mongoose = require("mongoose");
const configs = require("../configs.json");

const MongoDBConenct = function (callback) {
  mongoose.set("useCreateIndex", true);
  mongoose.set("useFindAndModify", false);
  mongoose
    .connect(configs.mongodb.atlas_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Cluster connected");
	  callback()
    })
    .catch((err) => console.log("MongoDB connection error", err));
};

module.exports = MongoDBConenct;
