var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');
var glob = require('glob');

module.exports = function () {
    mongoose.Promise = global.Promise;
    db = mongoose.connect(config.dbUrl, { useNewUrlParser: true, useCreateIndex: true }).then(function () {
        console.log('Connected to database successfully', config.dbUrl);
    }, function (err) {
        console.log('Database connection timeout error');
    });

    glob(path.dirname(require.main.filename) + '/modules/**/models/*.js', function(err, files){
        if(files && files.length){
            files.forEach(function(file){
                require(file);
            });
        }
    });

    return db;
}