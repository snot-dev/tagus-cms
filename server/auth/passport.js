const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;


const jwt = (User, authSecretKey) => {
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: authSecretKey
    };

    const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
        User.findOne({'_id': jwt_payload.id}).then(user => {
            if(user) {
                return next(null, {
                    id: user._id
                });
            }
            else {
                return next(new Error('User not found!'), null);
            }
        });
    }); 

    passport.use(strategy);
}

module.exports = {
    passport,
    initialize: () => {
        return passport.initialize();
    },
    strategies: {
        jwt
    },
    authenticate: (strategy, session) => {
        return passport.authenticate(strategy, session);
    }
};
