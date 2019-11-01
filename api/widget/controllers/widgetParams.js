var model = require("../models/widgetParams")

module.exports = {
    getAllWidgetParams,
    getOneWidgetParamByValue,
    addOneWidgetParam
}

function getAllWidgetParams(req, res) {
    res.set('Content-Type', 'application/json');
    model.getAllWidgetParams(req, res, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result })
        }
    })
    return
}

function getOneWidgetParamByValue(req, res) {
    res.set('Content-Type', 'application/json');
    let key = req.query.key
    let value = req.query.value
    if (key == "id") {
        model.getOneWidgetByID(req, res, value, (req, res, error, result) => {
            if (error) {
                console.error(error)
                res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
            } else {
                res.status(200).json({ status: 'success', code: 200, data: result })
            }
        })
        return
    } else if (key == "widget_id") {
        model.getOneWidgetParamsByWidgetID(req, res, value, (req, res, error, result) => {
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

function addOneWidgetParam(req, res) {
    res.set('Content-Type', 'application/json');
    let data = { name: req.body.name, widget_id: req.body.widget_id, type: req.body.type }
    model.addOneWidgetParam(req, res, data, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result.insertId })
        }
    })
    return
}