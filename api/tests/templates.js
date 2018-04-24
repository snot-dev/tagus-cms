const mongoose = require('mongoose'); 
const SharedTests = require("../shared/tests");
const tests = new SharedTests();

const testName = "Templates";
const url = "/tagus/api/templates/";

describe(testName, function() {
    before("Create test user", tests.beforeTest());

    after("Delete test user", tests.afterTest());

    it('List all items', tests.getAll(url, null, function(res) {
        res.body.list.should.be.a('array');
    }));
});