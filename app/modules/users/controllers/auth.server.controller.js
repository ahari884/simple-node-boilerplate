var User = require('mongoose').model('User');
var authMiddleware = require('../../../middlewares/auth.server.middlewares');
var usersDbo = require('../dbo/users.server.dbo');
var sessionsDbo = require('../dbo/session.server.dbo');
var async = require('async');
var crypto = require('crypto');

exports.signup = function (req, res) {
    var data = req.body;
    let firstName = data.firstName ? data.firstName : '';
    let lastName = data.lastName ? data.lastName : '';
    if (firstName) {
        data.displayName = firstName;
    }
    if (lastName) {
        if (firstName) {
            data.displayName += ' ';
        }
        data.displayName += lastName
    }
    
    var user = new User(data);
    user.save(function (err, result) {
        if (err) {
            res.status(422).send({
                success: false,
                message: 'Failed to signup!'
            })
        } else {
            res.status(200).send({
                success: true,
                message: 'Successfully signed up!'
            });
        }
    });

}

exports.signin = function (req, res) {

    var loginData = req.body;
    var userId;
    var accessToken;
    var refreshToken;
    var headers = req.headers;
    async.waterfall([
        function (next) {
            usersDbo.findUserByUsername(loginData.username, next);
        },
        function (userData, next) {
            usersDbo.validatePassword(userData, loginData.password, next);
        },
        function (userData, callback) {
            callback(null, userData);
        }
    ], function (err, result) {
        if (err) {
            res.status(422).send({
                success: false,
                message: err
            });
        } else {

            // data for jwt-access-token and refresh-token-generation
            var dataForToken = {
                _id: result._id,
                email: result.email,
                username: result.username,
                roles: result.roles
            };

            authMiddleware.generateToken(dataForToken, 2, function (err, accessToken) {
                authMiddleware.generateToken(dataForToken, 30 * 24, function (err, refreshToken) {
                    sessionsDbo.createSession({
                        userId: result._id,
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        headers: headers,
                        roles: result.roles
                    }, function (err, result) {
                        if (err) {
                            res.status(400).send({
                                success: false,
                                message: 'Can\'t access the server right now. Please try again.'
                            });
                        } else {
                            res.status(200).send({
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                                userData: result
                            });
                        }
                    });
                });
            });
        }
    });
}

exports.signout = function (req, res) {
    var accessToken = req.headers.access_token;
    sessionsDbo.deleteSession(accessToken, function (err, result) {
        if (err) {
            res.status(422).send({
                success: false,
                message: 'Unable to log out the user'
            });
        } else {
            res.status(200).send({
                success: true,
                message: 'Successfully logged out'
            });
        }
    });

}
