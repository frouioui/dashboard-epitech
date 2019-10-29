var model = require("../models/models")
const passManager = require("../password/password")

module.exports = {
    home,
    getAllUsersRoute,
    addNewUserRoute,
    loginUserRoute
}

function home(req, res) {
    res.set('Content-Type', 'application/json');
    res.status(200).json({ status: 'success', code: 200, message: "Users API - Dashboard Epitech - github.com/frouioui/dashboard-epitech" })
    return
}

function getAllUsersRoute(req, res) {
    res.set('Content-Type', 'application/json');
    model.getAllUsers(req, res, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: result })
        }
    })
}

function addNewUserRoute(req, res) {
    res.set('Content-Type', 'application/json');

    var data = { email: req.body.email, password: passManager.hashPassword(req.body.password) }

    model.addNewUser(req, res, data, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else {
            res.status(200).json({ status: 'success', code: 200, data: { id: result.insertId } })
        }
    })
}

function loginUserRoute(req, res) {
    res.set('Content-Type', 'application/json');

    var data = { email: req.body.email, password: req.body.password }

    model.getUserByEmail(req, res, data.email, (req, res, error, result) => {
        if (error) {
            console.error(error)
            res.status(500).json({ status: 'failure', code: 500, data: { message: "API server error" } })
        } else if (result.length == 0) {
            console.log("No email found")
            console.log(result)
            res.status(401).json({ status: 'failure', code: 401, data: { message: "No email found" } })
        } else {
            let hash = result[0].password
            if (passManager.comparePassword(data.password, hash) == true) {
                res.status(200).json({ status: 'success', code: 200, data: { message: "Authentificated" } })
            } else {
                res.status(401).json({ status: 'failure', code: 401, data: { message: "Wrong password" } })
            }
        }
    })
}

