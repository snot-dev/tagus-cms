const UnitField = require('../unitFields/model');
const SharedTests = require("../shared/tests");
const tests = new SharedTests();

const testName = "Unit Fields";
const url = "/tagus/api/unitfields/";

describe(testName, function() {
    before("Create test user", tests.beforeTest());

    after("Delete test user", tests.afterTest());

    it('List all items', tests.getAll(url, UnitField));
});
