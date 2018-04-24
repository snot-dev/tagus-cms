const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const settingsSchema = new mongoose.Schema({
    lang: {type: String, default: "en", required: true}
});

module.exports = mongoose.model('Settings', settingsSchema);
