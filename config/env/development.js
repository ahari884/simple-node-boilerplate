module.exports = {
    dbUrl : "mongodb://localhost/ds",
    sessionSecret : "heregoessecret",
    illegalUsernames: ['user','admin','users','admins'],
    PORT: process.env.NODE_PORT || 3000,
    HOST: process.env.NODE_HOST || 'localhost'
}
