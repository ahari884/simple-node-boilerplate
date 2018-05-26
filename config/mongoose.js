var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var glob = require('glob');

module.exports = function () {
    mongoose.Promise = global.Promise;
    db = mongoose.createConnection(config.dbUrl).then(function () {
        console.log('Connected to database successfully');
    }, function (err) {
        console.log('Database connection timeout error');
    });
    return db;
}