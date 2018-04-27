const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const unitFieldSchema = new mongoose.Schema({
    name: {type: String, required: true },
    alias: {type: String, required: true},
    type: {type: String, required: true },
    createdBy: String,
    created: {type:Date, default: Date.now()},
    edited: {type:Date, default: Date.now()},
    lastEditedBy:String
});

module.exports = mongoose.model('UnitField', unitFieldSchema);
