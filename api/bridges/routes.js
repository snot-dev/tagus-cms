const Bridge = require('./model');
const helpers = require('../shared/helpers');
const messages = require('../shared/messages');
const router = require('../router/router');

module.exports = router.defineCRUDRoutes(Bridge, {
    postOne: (req, res) => {
        const newBridge = new Bridge(req.body);
        newBridge.content = {
            default: {}
         };
         
         newBridge.markModified('content');
                    
        if(newBridge.name) {
            newBridge.alias = helpers.convertToAlias(newBridge.name);
        }
        
        Bridge.findOne({'alias': newBridge.alias})
        .then( doc => {
            if (doc && doc._id !== req.params.id) {
                res.json({success:false, warning: true, message: messages.warning.alreadyExists(newBridge.alias)})
            } 
            else {
                newBridge.save()
                .then(result => {
                    res.json({success: true, message: messages.success.updated(result.alias), result});
                })
                .catch(err =>{
                    res.json({success: false, error: messages.error.whileUpdating(newBridge.alias)});
                });
            }
        })
    }
});
