const express = require('express');
const path = require('path');
const routes = require('./server/index');
const Settings = require('./server/shared/validation');
const passport = require('./server/auth/passport');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

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
    
    mongoose.connect(config.mongoConnectionString);
    
    mongoose.connection.on('connected', function () {
        console.log("mongoose " + mongoose.connection.readyState);
        console.log('Connected to ' + mongoose.connection.db.s.databaseName);
    });
};

module.exports = {extend};