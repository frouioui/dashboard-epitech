var model = require("../models/widgetsUser")

module.exports = {
    getAllUserWidget,
    getUserWidgetsByValue,
    addOneUserWidget,
    deleteOneUserWidget,
    modifyPositionUserWidget
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
