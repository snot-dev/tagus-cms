const express = require('express');
const path = require('path');
const db = require('./config/db_config');
const routes = require('./api/routes');
const Settings = require('./api/shared/validation');
const passport = require('./api/auth/passport');

const extend = (app, settings) => {
    const config = new Settings(settings);
    
    if (config.isErrors()) {
        console.error(config.getErrors());

        process.exit(1);
    }

    app.use(passport.initialize());
    app.set('media', config.media);
    app.use('/tagus-admin', express.static(path.join(__dirname, '/client/build/')));
    app.use('/tagus/api', routes.api(app, 'jwt', config));
    app.use('/', routes.site());
    db.connect(config.mongoConnectionString);
    db.checkIfConnected();
};

module.exports = {extend};