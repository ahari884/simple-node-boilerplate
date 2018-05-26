var config = require('./config/config');
var mongoose = require('./config/mongoose');
var express = require('./config/express');

var db = mongoose();
var app = express();

var http = require('http').createServer(app);

http.listen(config.PORT);
console.log('App running at http://' + config.HOST + ':' + config.PORT + '/');
