const { con } = require("./config")

module.exports = {
    getAllServices,
    getOneService,
    addOneService
}

function getAllServices(req, res, dataHandler) {
    con.query("SELECT * FROM api_widget.services", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getOneService(req, res, id, dataHandler) {
    con.query("SELECT * FROM api_widget.services WHERE id = " + id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function addOneService(req, res, name, dataHandler) {
    con.query("INSERT INTO api_widget.services (name) VALUES ('" + name + "')", function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}