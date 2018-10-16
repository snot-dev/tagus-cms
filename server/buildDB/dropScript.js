const mongoose = require('mongoose');
const rfr = require('rfr');
rfr('/config');
mongoose.Promise = require('bluebird');
const removeCollections = require('./dbScripts').removeCollections;

if(!process.env.MONGO_CONNECTION_STRING) {
    console.log("Please create a env variable with your mongo connection string");
    process.exit(0);
}

console.log("Connecting to " + process.env.MONGO_CONNECTION_STRING)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    removeCollections();
});
