var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {
    connect: function(url) {
        return mongoose.connect(url);
    },
    checkConnection: mongoose.connection.readyState,
    checkIfConnected: function(){
        mongoose.connection.on('connected', function () {
            console.log("mongoose " + mongoose.connection.readyState);
            console.log('Connected to ' +  mongoose.connection.db.s.databaseName);
        });
    }
};
