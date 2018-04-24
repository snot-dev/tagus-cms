const mongoose = require('mongoose');
const helpers = require('../shared/helpers');
const messages = require('../shared/messages');
mongoose.Promise = require('bluebird');

module.exports = {
        defineCRUDRoutes: (model, routes = {}, router = require('express').Router()) => {
            try {
                if(!model) {
                    throw 'You must pass a valid model!';
                }
            }
            catch(err) {
                console.log(err);
                return 0;
            }

            if (routes.alt) {
                for(const route of routes.alt) {
                    router[route.method](route.path, route.func);
                }
            }

            router.get('/', (req, res)=> {
                if(routes.getAll) {
                    routes.getAll(req, res);
                }
                else {
                    model.find({})
                    .then(items => {
                        res.json({success: true, list: items});
                    })
                    .catch(err => {
                        res.json({success: false, error: messages.error.whileFetching(model.collection.collectionName)});
                    });
                }
            });

            router.post('/', (req, res)=> {
                if(routes.postOne) {
                    routes.postOne(req, res);
                } 
                else {
                    const newModel = new model(req.body);
                    
                    if(newModel.name) {
                        newModel.alias = helpers.convertToAlias(newModel.name);
                    }

                    newModel.created = new Date();

                    newModel.save()
                    .then(result => {
                        res.json({ success: true, message: messages.success.created('Document'), result});
                    })
                    .catch(err =>{
                        res.json({success: false, error: messages.error.whileCreating('Document')});
                    });
                }
            });

            router.get('/:id', (req, res)=> {
                if(routes.getById) {
                    routes.getById(req, res);
                }
                else {
                    model.findOne({'_id': req.params.id})
                    .then(item => {
                        res.json({success: true, item});
                    })
                    .catch(err => {
                        res.json({success: false, error: messages.error.whileFetching(model.collection.collectionName)});
                    });
                }
            });

            router.put('/:id', (req, res)=> {
                if(routes.updateById) {
                    routes.updateById(req, res);
                }
                else {
                    if(req.body.name) {
                        const alias = helpers.convertToAlias(req.body.name);
                        
                        model.findOne({'alias': alias})
                        .then(doc => {
                            if (doc && doc._id != req.params.id) {
                                res.json({success:false, warning: true, message: messages.warning.alreadyExists(alias)})
                            } else {
                                model.findOne({'_id': req.params.id})
                                .then(doc => {
                                    const updatedDoc = Object.assign(doc, req.body);
                                    
                                    if(updatedDoc.name) {
                                        updatedDoc.alias = helpers.convertToAlias(updatedDoc.name);
                                    }
            
                                    updatedDoc.edited = new Date();
                                    
                                    return updatedDoc.save();
                                })
                                .then(result =>{
                                    res.json({success: true, message: messages.success.updated(result.username || result.name), result});
                                })
                                .catch( err => {
                                    res.json({success: false, error: messages.error.whileUpdating(alias)});
                                })
                            }
                        })
                    }
                }
            });

            router.delete('/:id', (req, res)=>{
                if(routes.deleteById) {
                    routes.deleteById(req, res);
                }
                else {
                    model.remove({_id : req.params.id}, (err, result) => {
                        if (err) {
                            res.json({success: false, error: messages.error.whileDeleting('item')});
                        } 
                        else {
                            res.json({success: true, message: messages.success.deleted('item')});
                        }
                    });
                }
            });

            return router;
        }  
};