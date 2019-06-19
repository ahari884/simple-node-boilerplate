var mongoose = require('mongoose'),
  Session = mongoose.model('Session'),
  User = mongoose.model('User');

exports.getRoles = function (accessToken, callback) {
  Session.findOne({
    accessToken: accessToken
  }, {
    userId: 1,
    roles: 1,
    _id: 0
  }, function (err, response) {
    if (response) {
      callback(null, response)
    } else if(err){
      callback(err);
    }else{
      callback('No session found');
    }
  })
};

exports.getUser = function (accessToken, callback) {
  Session.findOne({
    accessToken: accessToken
  }, {
    userId: 1,
    _id: 0
  }, function (err, result) {
    if (err) {
      callback(err);
    } else if (!result) {
      callback('No user found');
    } else {
      User.findOne({
        _id: result.userId
      }, function (err, userData) {
        if (err) {
          callback(err);
        } else if (!userData) {
          callback('No user found');
        } else {
          callback(null, userData);
        }
      });
    }
  });
};

exports.getUserByRefreshToken = function (refreshToken, callback) {
  Session.findOne({
    refreshToken: refreshToken
  }, {
    userId: 1,
    _id: 0
  }, function (err, result) {
    if (err) {
      callback(err);
    } else if (!result) {
      callback('No user found');
    } else {
      User.findOne({
        _id: result.userId
      }, function (err, userData) {
        if (err) {
          callback(err);
        } else if (!userData) {
          callback('No user found');
        } else {
          callback(null, userData);
        }
      });
    }
  });
};

exports.createSession = function (sessionData, callback) {
  var session = new Session(sessionData);
  session.save(function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  })
}

exports.deleteSession = function (accessToken, next) {
  Session.findOneAndRemove({
    accessToken: accessToken
  }, function (err, res) {
    if(err){
      next(err);
    }else{
      next(null,'');
    }
  });
};

exports.updateSession = function (selectQuery, updateQuery, callback) {
  Session.update(selectQuery, updateQuery, function(err, response){
    if(err){
      callback(err);
    }else{
      callback(null, '');
    }
  })
}