var config = require('../../../config/config');

exports.indexResopnse = function(req, res) {
    res.status(200).send({
        messsage: 'Server running at http://' + config.HOST + ':' + config.PORT,
        status: 'up',
        success: true
    });
}
