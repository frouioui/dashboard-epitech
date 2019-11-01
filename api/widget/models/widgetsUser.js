const { con } = require("./config")

module.exports = {
    getAllUserWidgets,
    getOneUserWidgetByID,
    getUserWidgetsByName,
    getUserWidgetsByUserID,
    getUserWidgetsByUserIDOrderPosition,
    addOneUserWidget,
    deleteOneUserWidget,
    changePositionUserWidget
}

function getAllUserWidgets(req, res, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets_user`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getOneUserWidgetByID(req, res, id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets_user WHERE id = ` + id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getUserWidgetsByName(req, res, name, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets_user WHERE name = "` + name + `"`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getUserWidgetsByUserID(req, res, user_id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets_user WHERE user_id = ` + user_id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function getUserWidgetsByUserIDOrderPosition(req, res, user_id, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets_user WHERE user_id = ` + user_id + ` ORDER BY position ASC`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function addOneUserWidget(req, res, data, dataHandler) {
    con.query(`INSERT INTO api_widget.widgets_user (user_id, widget_id, position) VALUES (` + data.user_id + `, ` + data.widget_id + `, ` + data.position + `)`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function deleteOneUserWidget(req, res, id, dataHandler) {
    con.query(`DELETE FROM api_widget.widgets_user WHERE id = ` + id, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function changePositionUserWidget(req, res, data, dataHandler) {
    con.query(`UPDATE api_widget.widgets_user SET position = '` + data.position + `' WHERE id = ` + data.id, (error, results) => {
        dataHandler(req, res, error, results)
    })
}