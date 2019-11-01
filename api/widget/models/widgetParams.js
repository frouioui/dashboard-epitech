const { con } = require("./config")

module.exports = {
    getAllWidgetParams,
    getOneWidgetByID,
    getOneWidgetParamsByWidgetID,
    addOneWidgetParam
}

function getAllWidgetParams(req, res, dataHandler) {
    con.query(`SELECT * FROM api_widget.widget_params`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getOneWidgetByID(req, res, id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widget_params WHERE id = ` + id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getOneWidgetParamsByWidgetID(req, res, widget_id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widget_params WHERE widget_id = ` + widget_id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function addOneWidgetParam(req, res, data, dataHandler) {
    con.query(`INSERT INTO api_widget.widget_params (widget_id, name, type) VALUES (` + data.widget_id + `, "` + data.name + `", "` + data.type + `")`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}