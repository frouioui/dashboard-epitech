const { con } = require("./config")

module.exports = {
    getAllUserWidgets,
    getOneUserWidgetByID,
    getUserWidgetsByName,
    getUserWidgetsByUserID,
    getUserWidgetsByUserIDOrderPosition,
    addOneUserWidget,
    deleteOneUserWidget,
    changePositionUserWidget,
    getLastUserWidget,
    changeTimeUserWidget
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
    con.query(`INSERT INTO api_widget.widgets_user (user_id, widget_id, position, timer) VALUES (` + data.user_id + `, ` + data.widget_id + `, ` + data.position + `, ` + data.timer + `)`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function deleteOneUserWidget(req, res, data, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets_user WHERE user_id = ` + data.user_id + ` ORDER BY position DESC`, function (error, results, fields) {
        let last = results[0]
        con.query(`SELECT * FROM api_widget.widgets_user WHERE user_id = ` + data.user_id + ` AND id = ` + data.id, function (error2, results2, fields2) {
            let current = results2[0]
            con.query(`DELETE FROM api_widget.widgets_user WHERE id = ` + data.id, function (error3, results3, fields3) {
                if (current.id != last.id) {
                    con.query(`UPDATE api_widget.widgets_user SET position = '` + current.position + `' WHERE id = ` + last.id, (error4, results4) => {
                        dataHandler(req, res, error3, results4)
                    })
                } else {
                    dataHandler(req, res, error, results3)
                }
            })
        })
    })
}

function getLastUserWidget(req, res, data, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets_user WHERE user_id = ` + data.user_id + ` ORDER BY position DESC`, function (error, results, fields) {
        dataHandler(req, res, error, results)
    })
}

function changePositionUserWidget(req, res, data, dataHandler) {
    con.query(`SELECT * FROM api_widget.widgets_user WHERE user_id = ` + data.user_id + ` AND id = ` + data.id, function (error, results, fields) {
        let newPositionForOldID = results[0].position
        con.query(`SELECT * FROM api_widget.widgets_user WHERE user_id = ` + data.user_id + ` AND position = ` + data.position, function (error1, results1, fields1) {
            let oldId = results1[0].id
            con.query(`UPDATE api_widget.widgets_user SET position = '` + data.position + `' WHERE id = ` + data.id, (error2, results2) => {
                var updateResult = results2
                con.query(`UPDATE api_widget.widgets_user SET position = '` + newPositionForOldID + `' WHERE id = ` + oldId, (error3, results3) => {
                    dataHandler(req, res, error2, updateResult)
                })
            })
        })
    })
}

function changeTimeUserWidget(req, res, data, dataHandler) {
    con.query(`UPDATE api_widget.widgets_user SET timer = '` + data.timer + `' WHERE id = ` + data.id, (error, results) => {
        dataHandler(req, res, error, results)
    })
}