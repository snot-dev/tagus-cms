const mongoose = require('mongoose');
require('../../../config');
mongoose.Promise = require('bluebird');
const insertCollections = require('./dbScripts').insertCollections;

console.log("Connecting to " + process.env.MONGO_CONNECTION_STRING)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(() => {
    insertCollections(() => {
        process.exit(0);
    });
});