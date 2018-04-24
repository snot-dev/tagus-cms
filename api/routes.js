const content = require('./content/routes');
const Content = require('./content/model');
const units = require('./units/routes');
const unitFields = require('./unitFields/routes');
const users = require('./users/routes');
const translates = require('./translates/routes');
const Translates = require('./translates/model');
const bridges = require('./bridges/routes');
const Bridges = require('./bridges/model');
const settings = require('./settings/routes');
const User = require('./users/model');
const auth = require('./auth/routes');
const passport = require('./auth/passport');
const templates = require('./templates/routes');
const media = require('./media/routes');
const Cookies = require('universal-cookie');

const api = (app, strategy, settings) => {
    const router = require('express').Router();
    
    let protectMiddleware = (req, res, next) => {
        next();
    };
    
    if(strategy && passport.strategies[strategy]) {
        const session = {session: false};
        passport.strategies[strategy](User, settings.authSecretKey);
        protectMiddleware =  passport.authenticate(strategy, session)
    }
    
    router.use('/content', protectMiddleware, content);
    router.use('/bridges', protectMiddleware, bridges);
    router.use('/units', protectMiddleware, units);
    router.use('/unitfields', protectMiddleware, unitFields);
    router.use('/users', protectMiddleware, users(settings.email));
    router.use('/translates', protectMiddleware, translates);
    // router.use('/settings', protectMiddleware, settings);
    router.use('/templates', protectMiddleware, templates(app));
    router.use('/media', protectMiddleware, media(app));
    router.use('/auth', auth(User, settings.authSecretKey));

    return router;
};

const site = () => {
    const router = require('express').Router();
    const bridgesContent = {};
    let translatesContent = {};
    const fields = 'name alias url template partial content'
    
    router.get('/tagus/preview/:id', (req, res) => {
        const cookies = new Cookies(req.headers.cookie);
        const shouldPreview = cookies.get(`preview_${req.params.id}`);
        
        if (shouldPreview) {
            Bridges.find({})
            .then(docs => {
                if(docs) {
                    for(const bridge of docs) {
                        bridgesContent[bridge.alias] = bridge.content;
                    }
                }
                
                return Translates.findOne({})
            })
            .then(doc => {
                translatesContent = doc.translates;
                
                Content.findOne({'_id': req.params.id})
                .populate({
                    path: 'children',
                    populate: {path: 'children'}
                })
                .exec((err, result) => {
                    console.log(result);
                    if(result) {
                        res.render(result.template, {viewContent: result, bridges: bridgesContent, translates: translatesContent});
                    }
                    else {
                        res.json("404 - not found");
                    }
                });
            });
        }
        else {
            res.json("404 - not found");
        }
    });

    router.get('*', (req, res) => {
        Bridges.find({})
        .then(docs => {
            if(docs) {
                for(const bridge of docs) {
                    bridgesContent[bridge.alias] = bridge.content;
                }
            }

            return Translates.findOne({})
        })
        .then(doc => {
            translatesContent = doc.translates;
            
            Content.findOne({'url': req.url})
            .populate({
                path: 'children',
                populate: {path: 'children'}
            })
            .exec((err, result) => {
                if(result && result.published ) {
                    res.render(result.template, {viewContent: result, bridges: bridgesContent, translates: translatesContent});
                }
                else {
                    res.json("404 - not found");
                }
            });
        });
    });

    return router;
};


module.exports = {
    api,
    site
};