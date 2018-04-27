const SharedTests = require("../shared/tests");
const tests = new SharedTests();

const url = "/tagus/api/auth";
const testName = "Auth";

const userFields = ["_id", "email", "username"];

const {email, password} = tests.getMockUser();

describe(testName, function() {
    beforeEach("Create test user", tests.beforeTest());

    afterEach("Delete test user", tests.afterTest());

    it('Get authenticated user', tests.requestGetWithHeader(url, function(res) {
            res.body.success.should.to.equal(true);
            res.body.should.include.keys("user");
            res.body.user.should.be.a("object");
            res.body.user.should.not.include.keys("password");

            for(const field of userFields) {
                res.body.user.should.include.keys(field);
            }
    }));

    it("Authenticate existing user", tests.requestPost(url, {email, password}, function(res) {
        res.body.success.should.to.equal(true);
        res.body.should.include.keys("user");
        res.body.user.should.be.a("object");
        res.body.user.should.not.include.keys("password");

        for(const field of userFields) {
            res.body.user.should.include.keys(field);
        }

        res.body.user.email.should.to.equal(tests.getMockUser().email);

        res.body.should.include.keys("token");
        res.body.token.should.be.a("string");
    }));
});



