const { con } = require("./config")

module.exports = {
    getAllUserWidgetParams,
    getOneUserWidgetParamsByID,
    getUserWidgetParamsByUserID,
    getUserWidgetParamsByUserWidgetID,
    addOneUserWidgetParam,
    deleteUserWidgetParam,
    modifyValueUserWidgetParam
}

function getAllUserWidgetParams(req, res, dataHandler) {
    con.query(`SELECT * FROM api_widget.widget_user_params`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getOneUserWidgetParamsByID(req, res, id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widget_user_params WHERE id = ` + id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getUserWidgetParamsByUserID(req, res, id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widget_user_params WHERE user_id = ` + id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getUserWidgetParamsByUserWidgetID(req, res, widget_user_id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widget_user_params WHERE user_widget_id = ` + widget_user_id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function addOneUserWidgetParam(req, res, data, dataHandler) {
    con.query(`INSERT INTO api_widget.widget_user_params (user_id, user_widget_id, widget_param_id, value) VALUES (` + data.user_id + `, ` + data.widget_user_id + `, ` + data.widget_param_id + `, "` + data.value + `")`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function deleteUserWidgetParam(req, res, id, dataHandler) {
    con.query(`DELETE FROM api_widget.widget_user_params WHERE id = ` + id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function modifyValueUserWidgetParam(req, res, data, dataHandler) {
    con.query(`UPDATE api_widget.widget_user_params SET value = '` + data.value + `' WHERE id = ` + data.id, (error, results) => {
        dataHandler(req, res, error, results)
    })
}