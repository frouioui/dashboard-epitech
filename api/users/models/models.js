const { con } = require("./config")

module.exports = {
    getAllUsers,
    getUserByEmail,
    addNewUser
}

function getAllUsers(req, res, dataHandler) {
    con.query("SELECT * FROM users", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getUserByEmail(req, res, email, dataHandler) {
    con.query("SELECT * FROM users WHERE users.email = '" + email + "'", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function addNewUser(req, res, data, dataHandler) {
    con.query("INSERT INTO users (email, password) VALUES ('" + data.email + "', '" + data.password + "')", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}