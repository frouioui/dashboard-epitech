var model = require("../models/widgetsUser")
var modelParamsUser = require("../models/widgetParamsUser")
var modelParams = require("../models/widgetParams")
var modelWidget = require("../models/widgets")

module.exports = {
    getOneUserAllWidgets,
    getAllUserWidget,
    getUserWidgetsByValue,
    addOneUserWidget,
    deleteOneUserWidget,
    modifyPositionUserWidget
}

function addWidgetUserInformation(req, res, user_widget) {
    return new Promise(function (resolve, reject) {
        modelWidget.getOneWidgetByID(req, res, user_widget.widget_id, (req, res, error, resultWidget) => {
            if (error) {
                return reject(error);
            } else {
                user_widget.name = resultWidget[0].name
                user_widget.service_id = resultWidget[0].service_id
                user_widget.description = resultWidget[0].description
                resolve(user_widget)
            }
        })
    })

}

function addParamUserInformation(req, res, user_widget) {
    return new Promise(function (resolve, reject) {
        modelParamsUser.getUserWidgetParamsByUserWidgetID(req, res, user_widget.id, (req, res, error, resultParamsUser) => {
            if (error) {
                return reject(error)
            } else {
                user_widget.params = resultParamsUser
                user_widget.params.forEach(param => {
                    modelParams.getOneWidgetByID(req, res, user_widget.widget_id, (req, res, error, resultParam) => {
                        if (error) {
                            return reject(error)
                        } else {
                            param.name = resultParam[0].name
                            param.type = resultParam[0].type
                            return resolve(user_widget)
                        }
                    })
                });
            }
        })
    })
}

function getOneUserCompleteWidgetInfo(req, res, user_widget) {
    return new Promise(function (resolve, reject) {
        addWidgetUserInformation(req, res, user_widget).then(function (user_w) {
            addParamUserInformation(req, res, user_widget).then(function (user_w2) {
                return resolve(user_widget)
            }).catch((err) => setImmediate(() => { return reject(err) }))
        }).catch((err) => setImmediate(() => { return reject(err) }));
    })
}

function getOneUserAllWidgets(req, res) {
    res.set('Content-Type', 'application/json');
    let user_id = req.params.user_id

    model.getUserWidgetsByUserIDOrderPosition(req, res, user_id, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error 1" } })
        } else {
            var user_widgets = result
            var promises = [];
            user_widgets.forEach(user_widget => {
                promises.push(getOneUserCompleteWidgetInfo(req, res, user_widget));
            });
            Promise.all(promises)
                .then(function (data) {
                    res.status(200).json({ status: 'success', code: 200, data: user_widgets })
                })
                .catch(function (err) {
                    throw err;
                });
        }
    })
}

function getAllUserWidget(req, res) {
    res.set('Content-Type', 'application/json');
    model.getAllUserWidgets(req, res, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result })
        }
    })
    return
}

function getUserWidgetsByValue(req, res) {
    res.set('Content-Type', 'application/json');
    let key = req.query.key
    let value = req.query.value
    let order = req.query.order

    if (key == "id") {
        model.getOneUserWidgetByID(req, res, value, (req, res, error, result) => {
            if (error) {
                console.error(error)
                res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
            } else {
                res.status(200).json({ status: 'success', code: 200, data: result })
            }
        })
        return
    } else if (key == "name") {
        model.getUserWidgetsByName(req, res, value, (req, res, error, result) => {
            if (error) {
                console.error(error)
                res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
            } else {
                res.status(200).json({ status: 'success', code: 200, data: result })
            }
        })
        return
    } else if (key == "user_id" && order == "position") {
        model.getUserWidgetsByUserIDOrderPosition(req, res, value, (req, res, error, result) => {
            if (error) {
                console.error(error)
                res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
            } else {
                res.status(200).json({ status: 'success', code: 200, data: result })
            }
        })
        return
    } else if (key == "user_id") {
        model.getUserWidgetsByUserID(req, res, value, (req, res, error, result) => {
            if (error) {
                console.error(error)
                res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
            } else {
                res.status(200).json({ status: 'success', code: 200, data: result })
            }
        })
        return
    }
    res.status(400).json({ status: 'failure', code: 400, data: { message: "Invalid 'key' = '" + key + "' param" } })
    return
}

function addOneUserWidget(req, res) {
    res.set('Content-Type', 'application/json');
    let data = { position: req.body.position, user_id: req.body.user_id, widget_id: req.body.widget_id }
    model.addOneUserWidget(req, res, data, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result.insertId })
        }
    })
    return
}

function deleteOneUserWidget(req, res) {
    res.set('Content-Type', 'application/json');
    let id = req.params.id
    model.deleteOneUserWidget(req, res, id, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: { message: "Deleted" } })
        }
    })
    return
}

function modifyPositionUserWidget(req, res) {
    res.set('Content-Type', 'application/json');
    let data = { position: req.body.position, id: req.params.id }
    model.changePositionUserWidget(req, res, data, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200 })
        }
    })
    return
}
