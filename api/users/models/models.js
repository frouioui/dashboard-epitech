const { con } = require("./config")

module.exports = {
    getAllUsers,
    getUserByLogin,
    addNewUser,
    addNewUserNoPassword
}

function getAllUsers(req, res, dataHandler) {
    con.query("SELECT * FROM users", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getUserByLogin(req, res, login, dataHandler) {
    con.query("SELECT * FROM users WHERE users.login = '" + login + "'", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function addNewUser(req, res, data, dataHandler) {
    con.query("INSERT INTO users (login, password) VALUES ('" + data.login + "', '" + data.password + "')", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function addNewUserNoPassword(req, res, login, dataHandler) {
    con.query("INSERT INTO users (login) VALUES ('" + login + "')", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}