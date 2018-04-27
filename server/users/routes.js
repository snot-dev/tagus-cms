const User = require('./model');
const router = require('../router/router');
const messages = require('../shared/messages');
const mailer = require('../shared/mailer');
const helpers = require('../shared/helpers');

module.exports = settings => {
    const transporter = mailer(settings);
    
    const userRouter =  router.defineCRUDRoutes(User, {
        postOne: (req, res) => {
            if (!req.body.user.email) {
                res.json({success: false, error: messages.error.whileCreating('User')});
            } 
            else {
                if (!req.body.requirer.isAdmin) {
                    res.json({success:false, warning: true, message: messages.warning.noPermission()});
                }
                else {
                    const randomPassword = helpers.generateRandomPassword();

                    User.findOne({'email': req.body.user.email})
                    .then (doc => {
                        if (doc) {
                            res.json({success:false, warning: true, message: messages.warning.alreadyExists(req.body.user.email)});
                        }
                        else {
                            const newUser = new User(req.body.user);
                            let user = null;
            
                            newUser.password = newUser.generateHash(randomPassword);
                    
                            newUser.created = new Date();
                            newUser.isAdmin = false;
                    
                            newUser.save()
                            .then(result => {
                                user = Object.assign({}, result._doc);
                                delete user.password;
            
                                return transporter.verifyEmail(newUser.email, randomPassword);
                            })
                            .then (()=>{
                                res.json({ success: true, message: messages.success.created('User'), result: user});
                            })
                            .catch(err =>{
                                res.json({success: false, error: messages.error.whileCreating('User')});
                            });
                        }
                    })
                    .catch(err => {
                        res.json({success: false, error: messages.error.whileCreating('User')});
                    });
                }
            }

        },
        updateById: (req, res) => {
        User.findOne({'username': req.body.username})
        .then(doc => {
            if (doc && doc._id != req.params.id) {
                res.json({success:false, warning: true, message: messages.warning.alreadyExists(req.body.username)})
            } else {
                User.findOne({'_id': req.params.id})
                .then(doc => {
                    const updatedDoc = Object.assign(doc, req.body);

                    updatedDoc.edited = new Date();
                    
                    return updatedDoc.save();
                })
                .then(result =>{
                    res.json({success: true, message: messages.success.updated(result.username), result});
                })
                .catch( err => {
                    res.json({success: false, error: messages.error.whileUpdating("User")});
                })
            }
        })
        },
        alt: [
            {
                method: 'put',
                path: '/:id/update_password',
                func: (req, res) => {
                    User.findOne({'_id': req.params.id}).select('+password')
                    .then(doc => {
                        if (!req.body.oldPassword || !req.body.newPassword || !req.body.confirmPassword ) {
                            throw "You must send all required fields";
                        }
                        else if (req.body.oldPassword === req.body.newPassword) {
                            throw "The new password can't be the same as the old";
                        } 
                        else if (req.body.newPassword.length <= 4) {
                            throw "Password must have more ther 4 characters";
                        }
                        else if (!doc.validPassword(req.body.oldPassword, doc.password)) {
                            throw "Password is incorrect";
                        }
                        else {
                            doc.password = doc.generateHash(req.body.newPassword);
                            return doc.save()
                        }
                    })
                    .then(result => {
                        const user = Object.assign({}, result._doc);
                        delete user.password;
                        res.json({success: true, message: messages.success.updated("Password"), result: user});
                    })
                    .catch(error => {
                        res.json({success: false, error: true, message:error});
                    });
                }
            }   
        ]
    });

    return userRouter;
}


