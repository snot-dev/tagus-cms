const Content = require('./model');
const router = require('express').Router();
const helpers = require('../shared/helpers');
const messages = require('../shared/messages');

router.get('/', (req, res) => {
    Content.find({})
        .populate('children')
        .exec((err, docs) => {
            const response = { success: true };
            if (err) {
                response.success = false;
                response.error = messages.error.whileFetching('Content');
            }
            else {
                response.list = docs;
            }
            res.json(response);
        });
});

router.post('/', (req, res) => {
    let newContent = new Content(req.body);
    newContent.content = req.body.content;
    newContent.markModified('content');

    if (newContent.name) {
        newContent.alias = helpers.convertToAlias(newContent.name);
        if (!newContent.parent) {
            newContent.url = '/';
        }
        else {
            if (newContent.url === '/') {
                newContent.url = '';
            }
            newContent.url = `${newContent.url}/${helpers.convertToUrl(newContent.name)}`;
        }
    }

    Content.findOne({ 'alias': newContent.alias })
        .then(doc => {
            if (doc) {
                res.json({
                    success: false, warning: true, message: messages.warning.alreadyExists(newContent.alias)
                });
            }
            else {
                newContent.created = new Date();

                newContent.save()
                    .then(result => {
                        newContent = result;
                        return Content.findOne({ '_id': newContent.parent })
                    })
                    .then(parent => {
                        if (parent && !parent.children.includes(newContent._id)) {
                            parent.children.push(newContent._id);
                            return parent.save();
                        }
                    })
                    .then(() => {
                        res.json({ success: true, message: messages.success.created('Document'), result: newContent });
                    })
                    .catch(err => {
                        res.json({ success: false, error: true, message: messages.error.whileCreating('new Content') });
                    });
            }
        });
});

router.get('/:id', (req, res) => {
    Content.findOne({ '_id': req.params.id })
        .then(item => {
            res.json({ success: true, item });
        })
        .catch(err => {
            res.json({ success: false, error: messages.error.whileFetching('content') });
        });
});

router.put('/:id', (req, res) => {
    let alias = '';
    if (req.body.name) {
        alias = helpers.convertToAlias(req.body.name);
    }

    Content.findOne({ 'alias': alias })
        .then(doc => {
            if (doc && doc._id != req.params.id) {
                res.json({ success: false, warning: true, message: messages.warning.alreadyExists(alias) })
            }
            else {
                Content.findOne({ '_id': req.params.id })
                    .then(result => {
                        const updatedContent = Object.assign(result, req.body);

                        if (updatedContent.name) {
                            updatedContent.alias = helpers.convertToAlias(updatedContent.name);
                        }
                        return updatedContent.save();
                    })
                    .then(result => {
                        res.json({ success: true, message: messages.success.updated(result.name), result });
                    });
            }
        })
        .catch(err => {
            res.json({ success: false, error: messages.error.whileUpdating(alias) });
        });
});

router.delete('/:id', (req, res) => {
    let docsArray = [req.params.id];

    Content.find({})
        .then(docs => {
            const dictionary = {};
            const docID = req.params.id;

            for (const doc of docs) {
                dictionary[doc._id] = doc;
            }

            addChildrenToArray(dictionary, docID, docsArray);

            return Content.findOne({ '_id': dictionary[docID].parent })
        })
        .then(doc => {
            if (doc) {
                for (const child of docsArray) {
                    const indexOfChild = doc.children.indexOf(child);

                    if (indexOfChild > -1) {
                        doc.children.splice(indexOfChild, 1);
                    }
                }

                return doc.save();
            }
        })
        .then(() => {
            return Content.remove({ '_id': { $in: docsArray } })
        })
        .then(docs => {
            res.json({ success: true, docs, message: messages.success.deleted('item') });
        }).catch(err => {
            res.json({ success: false, error: messages.error.whileDeleting('item') });
        });

    const addChildrenToArray = (dictionary, id, arr) => {
        const children = dictionary[id].children;

        for (const child of children) {
            arr.push(child);
            if (dictionary[child] && dictionary[child].children) {
                addChildrenToArray(dictionary, child, arr);
            }
        }
    }
});

module.exports = router;