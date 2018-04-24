const User = require("../users/model");
const mongoose = require('mongoose'); 
const SharedTests = require("../shared/tests");
const helpers = require("../shared/helpers");
const tests = new SharedTests();

const url = "/tagus/api/users/";
const testName = "Users";

const userFields = ["_id", "email", "username", "created"];

const mock = {
        _id: new mongoose.mongo.ObjectId("5ace2262382d9b1ab815d480"),
        username: "Mocker",
        email: "mock@tagus.com",
        name: "Tagus",
        surname: "Tester",
        created: new Date()
};

const updatedValue = "testUpdate"
const updatedMock = Object.assign(mock, {name: updatedValue});

const validateUser = user => {
    for(const field of userFields) {
        user.should.include.keys(field);
        user.should.not.include.keys("password");
    }
};

describe(testName, function() {
    before("Create mock user", tests.beforeTest());

    after("Delete mock user", tests.afterTest());

    it("Create new User", tests.createNew(url, User, {user: mock, requirer: tests.getMockUser()}, function(res) {
    }));

    it("List all items", tests.getAll(url, User, function(res) {
        for(const user of res.body.list) {
            validateUser(user);
        }
    }));

     it("List one item", tests.getById(url, User, mock._id, function(res) {
         validateUser(res.body.item);
     }));

     it("Update item field", tests.update(url, User, {mock: updatedMock, test: "name"}, function(res) {
        validateUser(res.body.result);
     }));

     it('Delete Created Item', tests.deleteById(url, User, mock._id));
});