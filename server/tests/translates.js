const Translate = require('../translates/model');
const mongoose = require('mongoose'); 
const url = "/tagus/api/translates/";
const SharedTests = require("../shared/tests");
const tests = new SharedTests();
const testName = "Translates";

// const updatedValue = "testUpdate"
// const updatedMock = Object.assign(mock, {key: updatedValue});

const field = "testerOfTheTestsForTheTests1234";
const value = "test";
const updatedMock = {
    translates: {}
};

updatedMock.translates[field] = value;

let originalResult;
let originalTranslates;

describe(testName, function() {
    before("Create test user", tests.beforeTest());

    after("Delete test user", tests.afterTest());

    it('List all items', tests.getAll(url, null, function(res) {
        res.body.list.should.be.a('object');
    }));

    it('Update item', function(done) {
        Translate.findOne({})
        .then(function(result) {
            originalTranslates = Object.assign({}, result.translates);
            originalResult = Object.assign({translates: originalTranslates}, result);

            const req = {
                translates: Object.assign(updatedMock.translates, result.translates),
                lastEditedBy: result.lastEditedBy || "System"
            };

            return tests._createNew(url, Translate, req, function(res) {
                const instance = new Translate(res.body.result);

                instance.translates.should.be.a('object');
                instance.translates[field].should.to.equal(value);
                instance.name.should.to.equal('translates');
            });
        })
        .then(function() {
            const req = {
                translates: originalTranslates,
                lastEditedBy: originalResult.lastEditedBy
            };

            return tests._createNew(url, Translate, req, function(res) {
                const instance = new Translate(res.body.result);

                instance.translates.should.be.a('object');
                instance.translates.should.not.include.keys(field);
                instance.name.should.to.equal('translates');
            });
        })
        .then(function(){
            done();
        })
        .catch(function(err) {
            done(err);
        });
    });
});
