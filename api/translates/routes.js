const Translate = require('./model');
const router = require('express').Router();
const messages = require('../shared/messages');

router.get('/', (req, res) => {
    Translate.findOne()
    .then(doc => {
        res.json({success: true, list: doc.translates});
    })
    .catch(err => {
        res.json({success: false, error: messages.error.whileFetching("Translates")});
    })
});

router.post('/', (req, res) => {
    Translate.findOne()
    .then(doc => {
        doc.translates = req.body.translates;
        doc.lastEditedBy = req.body.lastEditedBy;
        doc.edited = new Date();
        
        return doc.save();
    })
    .then(result => {
        res.json({success: true, message: messages.success.updated("Translates"), result});
    })
    .catch(err => {
        res.json({success: false, error: messages.error.whileUpdating("Translates")});
    });
}); 

module.exports = router;
