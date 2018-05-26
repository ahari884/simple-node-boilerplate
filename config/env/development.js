module.exports = {
    dbUrl : "mongodb://localhost:27017/sample",
    sessionSecret : "heregoessecret",
    illegalUsernames: ['user','admin','users','admins'],
    PORT: process.env.NODE_PORT || 3000,
    HOST: process.env.NODE_HOST || 'localhost'
}
