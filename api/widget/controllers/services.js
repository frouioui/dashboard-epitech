var model = require("../models/services")

module.exports = {
    getAllServices,
    getOneService,
    addOneService
}

function getAllServices(req, res) {
    res.set('Content-Type', 'application/json');
    model.getAllServices(req, res, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result })
        }
    })
    return
}

function getOneService(req, res) {
    res.set('Content-Type', 'application/json');
    let id = req.params.id
    model.getOneService(req, res, id, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result })
        }
    })
    return
}

function addOneService(req, res) {
    res.set('Content-Type', 'application/json');
    let name = req.body.name
    model.addOneService(req, res, name, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result.insertId })
        }
    })
    return
}