var config = require('./config/config');
var express = require('./config/express');
var mongoose = require('./config/mongoose');

var app = express();
var db = mongoose();

var http = require('http').createServer(app);

http.listen(config.PORT);
console.log('App running at http://'+config.HOST+':'+config.PORT+'/');
