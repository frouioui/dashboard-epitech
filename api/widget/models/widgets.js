const { con } = require("./config")

module.exports = {
    getAllWidgets,
    getOneWidgetByID,
    getOneWidgetByName,
    getOneWidgetByServiceID,
    addOneWidget
}

function getAllWidgets(req, res, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getOneWidgetByID(req, res, id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets WHERE id = ` + id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getOneWidgetByName(req, res, name, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets WHERE name = "` + name + `"`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getOneWidgetByServiceID(req, res, service_id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets WHERE service_id = ` + service_id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function addOneWidget(req, res, data, dataHandler) {
    con.query(`INSERT INTO api_widget.widgets (service_id, name, description) VALUES (` + data.service_id + `, "` + data.name + `", "` + data.description + `")`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}