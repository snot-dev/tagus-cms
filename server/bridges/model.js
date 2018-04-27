const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const bridgeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    alias: {type: String, required: true},
    content: {type: mongoose.Schema.Types.Mixed, default: {}},
    unitType: {type: String, required: true},
    createdBy: String,
    created: {type:Date, default: Date.now()},
    edited: {type:Date, default: Date.now()},
    lastEditedBy:String
}, {minimize: false});

module.exports = mongoose.model('Bridge', bridgeSchema);
