var model = require("../models/widgetParamsUser")

module.exports = {
    getAllUserWidgetParams,
    getUserWidgetParamsByValue,
    addOneUserWidgetParam,
    deleteOneUserWidgetParam,
    modifyValueUserWidgetParam
}

function getAllUserWidgetParams(req, res) {
    res.set('Content-Type', 'application/json');
    model.getAllUserWidgetParams(req, res, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result })
        }
    })
    return
}

function getUserWidgetParamsByValue(req, res) {
    res.set('Content-Type', 'application/json');
    let key = req.query.key
    let value = req.query.value
    if (key == "id") {
        model.getOneUserWidgetParamsByID(req, res, value, (req, res, error, result) => {
            if (error) {
                console.error(error)
                res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
            } else {
                res.status(200).json({ status: 'success', code: 200, data: result })
            }
        })
        return
    } else if (key == "user_id") {
        model.getUserWidgetParamsByUserID(req, res, value, (req, res, error, result) => {
            if (error) {
                console.error(error)
                res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
            } else {
                res.status(200).json({ status: 'success', code: 200, data: result })
            }
        })
        return
    } else if (key == "widget_user_id") {
        model.getUserWidgetParamsByUserWidgetID(req, res, value, (req, res, error, result) => {
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

function addOneUserWidgetParam(req, res) {
    res.set('Content-Type', 'application/json');
    let data = { value: req.body.value, user_id: req.body.user_id, widget_user_id: req.body.widget_user_id, widget_param_id: req.body.widget_param_id }
    model.addOneUserWidgetParam(req, res, data, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result.insertId })
        }
    })
    return
}

function deleteOneUserWidgetParam(req, res) {
    res.set('Content-Type', 'application/json');
    let id = req.params.id
    model.deleteUserWidgetParam(req, res, id, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: { message: "Deleted" } })
        }
    })
    return
}

function modifyValueUserWidgetParam(req, res) {
    res.set('Content-Type', 'application/json');
    let id = req.params.id
    let value = req.body.value
    model.modifyValueUserWidgetParam(req, res, { id: id, value: value }, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200 })
        }
    })
    return
}