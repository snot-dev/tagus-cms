const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const unitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    alias: {type: String, required: true},
    tabs: { type : Array , default : [] },
    createdBy: {type: String, required: true},
    created: {type:Date, default: Date.now()},
    edited: {type:Date, default: Date.now()},
    lastEditedBy:String,
    templates: {type: Array, default: []}
}, {minimize: false});

module.exports = mongoose.model('Unit', unitSchema);
