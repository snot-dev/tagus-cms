const mongoose = require('mongoose');
const rfr = require('rfr');
rfr('/config');
mongoose.Promise = require('bluebird');
const removeCollections = require('./dbScripts').removeCollections;

console.log("Connecting to " + process.env.MONGO_CONNECTION_STRING)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    removeCollections();
});
