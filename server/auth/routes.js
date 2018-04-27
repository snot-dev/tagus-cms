const router = require('express').Router();
const jwt = require('jwt-simple');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const insertCollections = require('../buildDB/dbScripts').insertCollections;

module.exports = (User, secretKey) => {
    router.post('/', (req, res) => {
        if (req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            
            User.findOne({email}).select('+password').then(user => {
                if (user && user.validPassword(password, user.password)) {
                    const payload = {
                        id: user._id
                    };
                    
                    const token = jwt.encode(payload, secretKey);
                    
                    const clonedUser = Object.assign({}, user._doc);
                    delete clonedUser.password;

                    res.json({ 
                        success: true,
                        token,
                        user: clonedUser  
                    });
                }
                else {
                    res.json({
                        success: false,
                        error: "Wrong Email/Password"
                    });
                }
            });
        }
        else {
            res.sendStatus(401);
        }
    });
    
    router.post('/create', (req, res) => {
        let response = {};

        User.find({})
        .then(users => {
            if (users.length === 0) {
                if (req.body.password !== req.body.confirmPassword) {
                    throw "Password don't match!";
                }

                const admin = new User(req.body);
                
                admin.password = admin.generateHash(req.body.password);
                admin.isCreator = true;
                admin.isAdmin = true;
                
                return admin.save();
            } 
            else {
                throw 'Unauthorized!!!';
            }
        })
        .then(result => {
            const user = Object.assign({}, result._doc);
            delete user.password;
            
            const payload = {
                id: user._id
            }
            
            const token = jwt.encode(payload, secretKey);

            response = { 
                success: true,
                token,
                user  
            }; 
        })
        .then(() => {
            return insertCollections();
        })
        .then(() => {
            res.json(response);
        })
        .catch(error => {
            res.sendStatus(401);
        });
    });
    
    router.get('/', (req, res) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        
        if (token) {
            try {
                const user = jwt.decode(token, secretKey);
                
                User.findOne({'_id': user.id})
                .then(doc => {  
                    if (doc) {
                        res.json({
                            success: true,
                            user: doc
                        });
                    } 
                });
            }
            catch (error) {
                res.sendStatus(401);
            }
        }
        else {
            res.sendStatus(401);
        }
    });
    
    router.get('/info', (req, res) => {
        User.findOne({})
        .then(doc => {
            res.json(!doc);
        });
    });
    
    return router;
};

