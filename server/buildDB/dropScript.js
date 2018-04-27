const mongoose = require('mongoose');
require('../../../config');
mongoose.Promise = require('bluebird');
const removeCollections = require('./dbScripts').removeCollections;

console.log("Connecting to " + process.env.MONGO_CONNECTION_STRING)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    removeCollections();
});
