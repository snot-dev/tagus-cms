const UnitField = require('./model');
const router = require('express').Router();
const messages = require('../shared/messages');

router.get('/', (req, res) => {
    UnitField.find({})
    .then(items => {
        res.json({success: true, list: items});
    })
    .catch(err => {
        res.json({success: false, error: messages.error.whileFetching(model.collection.collectionName)});
    });
});

module.exports = router;


