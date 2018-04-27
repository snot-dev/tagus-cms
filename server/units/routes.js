const Unit = require('./model');
const Content = require('../content/model');
const router = require('../router/router');
const helpers = require('../shared/helpers');
const messages = require('../shared/messages');

module.exports = router.defineCRUDRoutes(Unit, {
    postOne: (req, res) => {
        const unit = Object.assign({
                alias: helpers.convertToAlias(req.body.name), 
                tabs: [
                    {
                        name: 'Default',
                        alias: 'default',
                        fields: []
                    }
                ], 
                templates: []
            },
            req.body);

        const newUnit = new Unit(unit);
        
        Unit.findOne({'alias': unit.alias})
        .then( doc => {
            if(doc && doc._id != req.params.id) {
                res.json({success:false, warning: true, message: messages.warning.alreadyExists(unit.alias)})
            } 
            else {
                newUnit.save()
                .then(result => {
                    res.json({success: true, message: messages.success.created(result.alias), result});
                })
                .catch(err => {
                    res.json({success: false, error: true, message: messages.error.whileCreating(unit.alias)});
                });
            }
        })
        .catch(err => {
            res.json({success: false, error: true, message: messages.error.whileCreating(unit.alias)});
        });
    },
    deleteById: (req, res) => {
        Content.find({unitType: req.params.id})
        .then(docs => {
            if (docs.length === 0) {
                Unit.remove({_id: req.params.id})
                .then(result => {
                    res.json({success: true, message: messages.success.deleted("Unit")});
                })
                .catch(err => {
                    res.json({success: false, error: true, message: messages.error.whileDeleting("Unit")});
                });
            }
            else {
                const content = docs.map(doc => doc.name);
                res.json({success: false, warning: true, content });
            }
        })
        .catch(err => {
            res.json({success: false, error: true, message: messages.error.whileDeleting("Unit")});
        })
    }
});
