var mongoose = require('mongoose'),
  Users = mongoose.model('User');
var crypto = require('crypto');

exports.findUserByUsername = function (username, callback) {
    Users.findOne({
      username: username
    }, function (err, result) {
      var userData = result;
      if (err) {
        callback('Something went wrong');
      } else if (!result) {
        callback('User credentials are not found');
      } else {
        callback(null, userData);
      }
    });

};

exports.validatePassword = function (userData, password, callback) {
    var password = crypto.pbkdf2Sync(password, new Buffer(userData.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
    if (password === userData.password) {
      var data = {};
      data._id = userData._id;
      data.username = userData.username;
      data.provider = userData.provider;
      data.roles = userData.roles;
      data.profileImageURL = userData.profileImageURL;
      data.email = userData.email;
      data.firstName = userData.firstName;
      data.lastName = userData.lastName;

      callback(null, data);
    } else {
      callback('Password does not mathch');
    }
};