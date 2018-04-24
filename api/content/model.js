const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const contentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    alias: {type: String, required: true},
    url: { type: String, required: true },
    createdBy: { type: String, required: true },
    created: { type: Date, default: Date.now() },
    edited: Date,
    lastEditedBy:String,
    published: {type: Boolean, default: false},
    accessible: {type: Boolean, default: false},
    nav: {type: Boolean, default: false},
    publishedAt: { type: Date, default: Date.now() },
    unitType: {type: mongoose.Schema.Types.ObjectId, ref: 'Unit'},
    content: {type: mongoose.Schema.Types.Mixed, default: {}},
    template: { type: String, required: true },
    partial: String,
    parent: String,
    children: [{type: mongoose.Schema.Types.ObjectId, ref: 'Content'}],
    sortOrder: { type: Number },
    isHome: { type: Boolean, default: false }
}, {minimize: false});

let model = mongoose.model('Content', contentSchema);

model.collection.name = 'content';

module.exports = model;