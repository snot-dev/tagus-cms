const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const translateSchema = new mongoose.Schema({
    name: {type: String, required: true, default: 'translates'},
    translates: {type: mongoose.Schema.Types.Mixed, default: {}},
    edited: {type:Date, default: Date.now()},
    lastEditedBy: String
}, {minimize: false});

module.exports = mongoose.model('Translate', translateSchema);
