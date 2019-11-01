var model = require("../models/widgets")

module.exports = {
    getAllWidgets,
    getOneWidgetByValue,
    addOneWidget
}

function getAllWidgets(req, res) {
    res.set('Content-Type', 'application/json');
    model.getAllWidgets(req, res, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result })
        }
    })
    return
}

function getOneWidgetByValue(req, res) {
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
    } else if (key == "name") {
        model.getOneWidgetByName(req, res, value, (req, res, error, result) => {
            if (error) {
                console.error(error)
                res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
            } else {
                res.status(200).json({ status: 'success', code: 200, data: result })
            }
        })
        return
    } else if (key == "service_id") {
        model.getOneWidgetByServiceID(req, res, value, (req, res, error, result) => {
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

function addOneWidget(req, res) {
    res.set('Content-Type', 'application/json');
    let data = { name: req.body.name, service_id: req.body.service_id, description: req.body.description }
    model.addOneWidget(req, res, data, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result.insertId })
        }
    })
    return
}