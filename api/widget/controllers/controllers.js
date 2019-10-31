var model = require("../models/widgets")

module.exports = {
    home
}

function home(req, res) {
    res.set('Content-Type', 'application/json');
    res.status(200).json({ status: 'success', code: 200, message: "Widget API - Dashboard Epitech - github.com/frouioui/dashboard-epitech" })
    return
}
