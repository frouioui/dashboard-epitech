const { con } = require("./config")

module.exports = {
    getAllUsers
}

function getAllUsers(req, res, dataHandler) {
    con.query("SELECT * FROM users", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}