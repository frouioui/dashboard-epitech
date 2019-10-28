var model = require("../models/models")

module.exports = {
    home,
    getAllUsersRoute
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