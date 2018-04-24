const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../../app');
const mongoose = require('mongoose'); 
const User = require('../users/model');
const jwt = require('jwt-simple');
const helpers = require('./helpers');


chai.use(chaiHttp);

class Tests {
    constructor() {
        this._token = null;
        this._userId = null;
        this._createdItem = false;
        this._mockUser = {
            username: "Tester",
            email: "tester@tagus.com",
            password: helpers.generateRandomPassword(),
            name: "Tagus",
            surname: "Tester",
            created: new Date(),
            isAdmin: true
        };
    }

    _createMockUser(generateToken = true, done) {
        return new Promise((resolve, reject) => {
            const user = new User(this._mockUser);

            user.password = user.generateHash(user.password);

            user.save()
            .then(result => {
                this._userId = result._id;
                if (generateToken) {
                    this._token = jwt.encode({id: result._id}, process.env.AUTHSECRETORKEY);
                }

                if (done) {
                    done();
                }
                resolve();
            })
            .catch(err => {
                reject(err);
            });
        });
    };
    
    _deleteMockUser(done) {
        return new Promise((resolve, reject) => {
            User.remove({_id: this._userId}, (err, result)  => {
                this._token = null;
                this._userId = null;
                
                if (done) {
                    done();
                }
                resolve();
            })
            .catch(err => {
                if(done) {
                    done(err);
                }
                reject(err);
            });
        })
    };

    _deleteMockIfStillExists (Model, mock) {
        return Model.remove({_id: mock._id});
    }

    CRUD (url, Model, mocks = {}, validation =  {}) {
        const that = this;
        return function() {
            before("Create test user", that.beforeTest(Model, mocks, validation.before));
            
            after("Delete test user", that.afterTest(Model, mocks, validation.after));

            it("Create new Item", that.createNew(url, Model, mocks.new, validation.create));

            it("List all items",that.getAll(url, Model, validation.list));

            it("List one item", that.getById(url, Model, mocks.new._id, validation.single));

            it("Update item field", that.update(url, Model, mocks.update, validation.update));

            it('Delete Created Item', that.deleteById(url, Model, mocks.new._id, validation.delete));
        };
    };
    
    createNew (url, Model, payload, validation) {
        const that = this;
        
        return function(done) {
            that._createNew(url, Model, payload, validation)
            .then(function() {
                done();
            })
            .catch(that._failTest(done));
        };
    }

    getAll (url, Model, validation) {
        const that = this;
        
        return function(done) {
            that._getAll(url, Model, validation)
            .then (function() {
                done();
            })
            .catch(that._failTest(done))
        };
    };
    
    getById (url, Model, id, validation) {
        const that = this;
        
        return function(done) {
            that._getById(url, Model, id, validation)
            .then(function () {
                done();
            })
            .catch(that._failTest(done));
        };
    };
    
    update (url, Model, payload, validation) {
        const that = this;

        return function (done) {
            that._update(url, Model, payload, validation)
            .then(function () {
                done();
            })
            .catch(that._failTest(done));
        };
    };

    deleteById (url, Model, id, validation) {
        const that = this;

        return function(done) {
            that._deleteById(url, Model, id, validation)
            .then(function(){
                done();
            })
            .catch(that._failTest(done));
        };
    }

    //Creates a new user to get authorization to interact with the API and deletes any mock that still persists
    beforeTest (Model, mocks = {}, validation =  {}, generateToken = true) {
        const that = this;

        return function(done){
            that._createMockUser(generateToken)
            .then(function() {
                if (mocks.new) {
                    return that._deleteMockIfStillExists(Model, mocks.new);
                }
            })
            .then(function() {
                done();
            })
            .catch(function(err) {
                done(err);
            });
        }
    }
    
    //Deletes the user previous creates to get authorization to interact with the API and deletes any mock that still persists
    afterTest (Model, mocks = {}, validation =  {}) {
        const that = this;

        return function(done) {
            that._deleteMockUser()
            .then(function() {
                if (mocks.new) {
                    return that._deleteMockIfStillExists(Model, mocks.new);
                }
            })
            .then(function() {
                done();
            })
            .catch(function(err) {
                done(err);
            });
        }
    }

    getMockUser() {
        return this._mockUser;
    }

    requestGet (url, validation) {
        const that = this;

        return function(done) {
            that._requestGet(url, validation)
            .then(function() {
                done();
            })
            .catch(function(err) {
                done(err);
            });
        };
    }


    requestGetWithHeader (url, validation) {
        const that = this;

        return function(done) {
            that. _requestGetWithHeader(url, validation)
            .then(function() {
                done();
            })
            .catch(function(err) {
                done(err);
            });
        };
    }

    requestPost (url, payload, validation) {
        const that = this;
        return function(done) {
            that._requestPost(url, payload, validation)
            .then(function() {
                done();
            })
            .catch(function(err) {
                done(err);
            });
        }
    }

    _requestGet (url, validation) {
        const that = this;

        return new Promise(function(resolve, reject) {
            chai.request(server)
            .get(url)
            .then(function(res){
                that._validRequest(res, validation);
                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }

    _requestPost(url, payload, validation) {
        const that = this;

        return new Promise(function(resolve, reject) {
            chai.request(server)
            .post(url)
            .send(payload)
            .then(function(res) {
                that._validRequest(res, validation);
                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }

    _requestGetWithHeader (url, validation) {
        const that = this;

        return new Promise(function(resolve, reject) {
            chai.request(server)
            .get(url)
            .set('Authorization', `Bearer ${that._token}`)
            .then(function(res){
                that._validRequest(res, validation);
                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }


    _validRequest(res, validation) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
            
        if (validation) {
            validation(res);
        }
    }

    _createNew (url, Model, payload, validation) {
        const that = this;

        return new Promise(function(resolve, reject) {
            chai.request(server)
            .post(url)
            .set('Authorization', `Bearer ${that._token}`)
            .send(payload)
            .then(function(res){
                that._validRequest(res);
                // res.body.success.should.to.equal(true);
                    
                if (validation) {
                    validation(res);
                }
                else {
                    const instance = new Model(res.body.result);
                    
                    should.not.exist(instance.validateSync())
                }

                that._createdItem = true;
                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }

    _getAll (url, Model, validation) {
        const that = this;
        
        return new Promise(function(resolve, reject) {
            chai.request(server)
            .get(url)   
            .set('Authorization', `Bearer ${that._token}`)         
            .then(function(res) {
                that._validRequest(res);
                res.body.success.should.to.equal(true);
                
                if (validation) {
                    validation(res);
                } 
                else {
                    res.body.list.should.be.a('array');
                    res.body.list.forEach(doc => {
                        const instance = new Model(doc);
                        should.not.exist(instance.validateSync());
                    });
                }
    
               resolve();
            })
            .catch(function(err){
                reject(err);
            });
        });
    };
    
    _getFirstFromCollection (url, Model, validation) {
        const that = this;

        return new Promise(function (resolve, reject) {
            chai.request(server)
            .get(url)
            .set('Authorization', `Bearer ${that._token}`)
            .then((err, res) => {
                chai.request(server)
                .get(`${url}${res.body[0]._id}`)
                .end((err, res) => {
                    that._validRequest(res);
    
                    if (validation) {
                        validation(res);
                    } 
                    else {
                        const instance = new model(res.body);
                        
                        should.not.exist(instance.validateSync())
                    }
    
                    done();
                });
            });
        });
    };
    
    _getById (url, Model, id, validation) {
        const that = this;

        return new Promise(function(resolve, reject) {
            if(!id) {
                reject(Error("You must pass a valid id"));
            }

            chai.request(server)
            .get(`${url}${id}`)
            .set('Authorization', `Bearer ${that._token}`)
            .then(function (res) {
                that._validRequest(res);
                res.body.success.should.to.equal(true);
    
                if (validation) {
                    validation(res);
                } 
                else {
                    const instance = new Model(res.body.item);
                    
                    should.not.exist(instance.validateSync())
                }
    
                resolve();
            })
            .catch(function (err) {
                reject(err);
            });
        });
    };
    
    _update (url, Model, payload, validation) {
        const that = this;

        return new Promise(function(resolve, reject) {
            chai.request(server)
            .put(`${url}${payload.mock._id}`)
            .send(payload.mock)
            .set('Authorization', `Bearer ${that._token}`)
            .then(function (res) {
                that._validRequest(res);
                res.body.success.should.to.equal(true);

                if (validation) {
                    validation(res);
                }
                else {
                    const instance = new Model(res.body.result);
                    
                    instance[payload.test].should.to.equal(payload.mock[payload.test]);
                    
                    should.not.exist(instance.validateSync());
                }

                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
        });
    };

    _deleteById (url, Model, id, validation) {
        const that = this;

        return new Promise(function(resolve, reject) {
            let deletedId;
        
            chai.request(server)
            .delete(`${url}${id}`)
            .set('Authorization', `Bearer ${that._token}`)
            .then(function(res) {
                that._validRequest(res);
                res.body.success.should.to.equal(true);

                if (validation) {
                    validation(res);
                }
        
                that._createdItem = false;
                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
        });
    };

    _passTest(done) {
        return function() {
            done();
        };
    }

    _failTest(done) {
        return function(err) {

            done(err);
        }
    };
}

module.exports = Tests;