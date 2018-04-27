const Content = require('../content/model');
const mongoose = require('mongoose'); 
const SharedTests = require("../shared/tests");
const tests = new SharedTests();

const testName = "Content";
const url = "/tagus/api/content/";

const mock = {
    _id: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'),
    name: "Home",
    alias: "home",
    url: "/",
    createdBy: "System",
    unitType: "5a017a9e83dd7214c8661648",
    partial: null,
    template: "master",
    isHome: true,
    published: true,
    children: [],
    content: {
        default: {
            title: "Your Favorite Source of Free Bootstrap Themes",
            subTitle: "Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!",
            link: "#about",
            linkText: "Find Out More"
        }
    }
};

const updatedValue = "testUpdate"

const updatedMock = Object.assign(mock, {name: updatedValue});

describe(testName, tests.CRUD(url, Content, {new: mock, update: {mock: updatedMock, test: "name"}}));
